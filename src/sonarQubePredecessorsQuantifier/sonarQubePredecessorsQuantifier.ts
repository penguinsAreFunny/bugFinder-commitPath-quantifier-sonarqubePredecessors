import {inject, injectable, optional} from "inversify";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require("axios");
// eslint-disable-next-line @typescript-eslint/no-var-requires
import {LocalityMap, Quantifier, SHARED_TYPES} from "bugfinder-framework";
import {CommitPath, PredecessorsUnique} from "bugfinder-localityrecorder-commitpath"
import {Logger} from "ts-log";
import {Cache} from "./cache";
import {BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES} from "../TYPES";
import {SonarQubeMeasurement, SonarQubeQuantifier} from "bugfinder-commitpath-quantifier-sonarqube";
import {SonarQubePredecessorMeasurement} from "./measurement";

@injectable()
export class SonarQubePredecessorsQuantifier implements Quantifier<CommitPath, SonarQubePredecessorMeasurement> {
    @optional() @inject(SHARED_TYPES.logger)
    logger: Logger

    @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.cache)
    cache: Cache

    @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.n)
    n: number

    @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.upToN)
    upToN: boolean

    @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.uniqueMode)
    uniqueMode: boolean

    @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.useThisCommitPath)
    useThisCommitPath: boolean

    @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.sonarQube)
    sonarQube: SonarQubeQuantifier

    async quantify(localitiesToQuantify: CommitPath[], allLocalities: CommitPath[])
        : Promise<LocalityMap<CommitPath, SonarQubePredecessorMeasurement>> {
        /**
         * merge all CommitPaths which are in the same commit
         * performance optimization
         * git checkout and SonarQube-quantification is costly therefore only run this process once
         * for each commit
         */
        this.logger?.info("SonarQubePredecessorsQuantifier starting...")
        await this.cache.init()



        // quantify localities not quantified already and write to cache.
        const nPredecessorsMap = this.getNPredecessorsMap(localitiesToQuantify, allLocalities)
        const notQuantifiedLocs = this.getNotQuantifiedLocs(localitiesToQuantify, nPredecessorsMap)
        const sonarQubeQuantifications = new LocalityMap<CommitPath, SonarQubeMeasurement>()
        const quantifications = new LocalityMap<CommitPath, SonarQubePredecessorMeasurement>()

        this.logger?.info(`Got ${notQuantifiedLocs.length} not quantified localities.`)
        if (notQuantifiedLocs.length > 0) {
            this.logger?.info("Quantifying not quantified localities...")
            await this.quantifyLocalities(notQuantifiedLocs, sonarQubeQuantifications)
        }

        this.logger?.info("Quantifying all localities and their predecessors while using cache...")

        let x = 0
        for (const el of (nPredecessorsMap.toArray())) {
            const predecessors = el.val
            if (predecessors == null) continue

            for (const pred of predecessors) {
                const measurement = await this.cache.get(pred)
                if (measurement == null) {
                    x++
                    this.logger?.debug("SonarQubePredecessorsQuantifier: Not found in cache: ", pred.commit.order, pred.path.path)
                }
            }
        }
        this.logger?.debug("SonarQubePredecessorsQuantifier: Total not found CPs: ", x)

        for (const el of (nPredecessorsMap.toArray())) {
            const predecessorsMeasurements = []
            const predecessors = el.val
            if (predecessors == null) {
                quantifications.set(el.key, null)
                continue
            }

            // get all measurements for each predecessor
            for (let i = 0; i < predecessors.length; i++) {
                if (i == 0 && !this.useThisCommitPath) continue

                const pred = predecessors[i]
                let measurement: SonarQubeMeasurement = await this.cache.get(pred)
                if (measurement == null) {
                    // retry quantification
                    this.logger?.info(`Quantification not found in cache for locality ${pred.commit.hash} `
                        + `${pred.path.path}. Retrying quantification of locality...`)
                    const commit = [{hash: pred.commit.hash, localities: [pred], paths: [pred.path.path]}]
                    measurement = (await this.sonarQube.quantifyCommit(commit, 0, sonarQubeQuantifications))[0]

                    if (measurement == null) {
                        // retry failed
                        this.logger?.error("Error: Could not get measurement for " +
                            `locality ${pred.commit.hash} ${pred.path.path}`)
                        continue
                    }
                    await this.cache.set(pred, measurement)
                }
                predecessorsMeasurements.push(measurement)
            }

            // create SonarQubePredecessorMeasurement from Predecessors-SonarQubeMeasurements
            const currentCommitPath = el.key
            const predecessorsMeasurement = new SonarQubePredecessorMeasurement(predecessorsMeasurements)
            quantifications.set(currentCommitPath, predecessorsMeasurement)

        }

        return quantifications
    }

    private async quantifyLocalities(localities: CommitPath[],
                                     quantifications: LocalityMap<CommitPath, SonarQubeMeasurement>)
        : Promise<void> {

        const hashes = new Map<string, number>();
        let commits: { hash: string, localities: CommitPath[], paths: string[] }[] = []

        for (const locality of localities) {
            if (hashes.get(locality.commit.hash) === 1) continue;
            hashes.set(locality.commit.hash, 1);

            const commitPaths = localities.filter(loc => {
                return loc.commit.hash === locality.commit.hash
            })

            const paths = commitPaths.map(commitPath => {
                return commitPath.path?.path
            })

            commits.push({
                hash: locality.commit.hash,
                localities: commitPaths,
                paths: paths
            });
        }

        this.logger?.info("Total commits: ", commits.length)

        this.logger?.info("Starting quantifying...")
        // quantifying each commit
        for (let i = 0; i < commits.length; i++) {
            this.logger?.info(`Quantifying commit ${i + 1} of ${commits.length}. Hash: ${commits[i].hash}`);
            // check for quantifications in cache
            if (commits[i].paths.length == 0 || commits[i].paths[0] == undefined) {
                this.logger?.info("ignoring commit as no paths are left to quantify for this commit. If you like",
                    "to inject on empty paths see pathsHandling-injections")
                return
            }

            const succeeded = await this.checkCache(commits[i].localities, quantifications)
            if (succeeded) {
                this.logger?.info("Successfully retrieved measurements from cache")
                continue
            }
            const measurements = await this.sonarQube.quantifyCommit(commits, i, quantifications)

            for(const locality of commits[i].localities) {
                this.logger?.info(`Writing measurements for locality ${locality.commit.hash}` +
                    ` ${locality.path.path} to cache.`)
                await this.cache.set(locality, measurements[i])
            }
        }
    }

    private getNPredecessorsMap(localitiesToQuantify: CommitPath[], allLocalities: CommitPath[])
        : LocalityMap<CommitPath, CommitPath[]> {

        // get all nPredecessors for each locality of localities to quantify
        if (this.uniqueMode) {
            CommitPath.setPredecessorDelegation(new PredecessorsUnique(this.logger))
        }
        return CommitPath.getNPredecessorsMap(localitiesToQuantify, this.n, this.upToN,
            this.uniqueMode, allLocalities)
    }

    private getNotQuantifiedLocs(localitiesToQuantify: CommitPath[],
                                 nPredecessorsMap: LocalityMap<CommitPath, CommitPath[]>): CommitPath[] {

        // calculate all localities which are not quantified yet
        const locsNotQuantified = new Map<string, CommitPath[]>()

        for (const loc of localitiesToQuantify) {

            const nPredecessors = nPredecessorsMap.getVal(loc)
            // f.e. upToN = false and there were less than n predecessors.
            if (nPredecessors == null) continue

            for (const predLoc of nPredecessors) {
                if (this.cache.get(predLoc) == null) {
                    const key = predLoc.key()
                    const current = locsNotQuantified.get(key)
                    if (current == null) {
                        locsNotQuantified.set(key, [predLoc])
                    } else {
                        locsNotQuantified.set(key, [...current, predLoc])
                    }
                }
            }

        }

        const locsNotQuantifiedArray: CommitPath[] = []
        for (const val of locsNotQuantified.values()) {
            locsNotQuantifiedArray.push(...val)
        }

        return locsNotQuantifiedArray
    }

    /**
     * Check cache for localities of a Commit. Returns whether all localities were found in Cache.
     * Does not set quantifications if a locality was not found.
     * @param localities
     * @param quantifications
     */
    async checkCache(localities: CommitPath[], quantifications: LocalityMap<CommitPath, SonarQubeMeasurement>)
        : Promise<boolean> {

        const measurements: SonarQubeMeasurement[] = []
        for (const cp of localities) {
            const measurement = await this.cache.get(cp)
            if (measurement == null) {
                return false
            }
            measurements.push(measurement)
        }

        for (let i = 0; i < localities.length; i++) {
            quantifications.set(localities[i], measurements[i])
        }

        return true
    }

}