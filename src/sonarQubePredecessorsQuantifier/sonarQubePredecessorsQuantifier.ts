import {inject, injectable, optional} from "inversify";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require("axios");
// eslint-disable-next-line @typescript-eslint/no-var-requires
import {LocalityMap, Quantifier} from "bugfinder-framework";
import {CommitPath, PredecessorsUnique} from "bugfinder-localityrecorder-commitpath";
import {Logger} from "ts-log";
import {Cache} from "./cache";
import {BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES} from "../TYPES";
import {SonarQubeMeasurement, SonarQubeQuantifier} from "bugfinder-commitpath-quantifier-sonarqube";

@injectable()
export class SonarQubePredecessorsQuantifier implements Quantifier<CommitPath, SonarQubeMeasurement> {
    @optional() @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.logger)
    logger: Logger

    @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.cache)
    cache: Cache;

    @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.n)
    n: number

    @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.upToN)
    upToN: boolean

    @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.uniqueMode)
    uniqueMode: boolean

    @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.sonarQube)
    sonarQube: SonarQubeQuantifier

    async quantify(localitiesToQuantify: CommitPath[], allLocalities: CommitPath[])
        : Promise<LocalityMap<CommitPath, SonarQubeMeasurement>> {
        /**
         * merge all CommitPaths which are in the same commit
         * performance optimization
         * git checkout and SonarQube-quantification is costly therefore only run this process once
         * for each commit
         */
        this.logger.info("SonarQubePredecessorsQuantifier starting...")
        await this.cache.init()

        // quantify localities not quantified already and write to cache.
        const nPredecessorsMap = this.getNPredecessorsMap(localitiesToQuantify, allLocalities)
        const notQuantifiedLocs = this.getNotQuantifiedLocs(localitiesToQuantify, nPredecessorsMap)
        const quantifications = new LocalityMap<CommitPath, SonarQubeMeasurement>();

        this.logger.info("Quantifying not quantified localities...")
        await this.quantifyLocalities(notQuantifiedLocs, quantifications)

        this.logger.info("Quantifying all localities and their predecessors...")
        const missingMeasurements: CommitPath[] = []
        for (const el of (nPredecessorsMap.toArray())) {
            const measurements = []
            const predecessors = el.val

            // get all measurements for each predecessor
            for (const pred of predecessors) {
                let measurement: SonarQubeMeasurement = await this.cache.get(pred)
                if (measurement == null) {
                    // retry quantification
                    this.logger.warn(`Missing quantification for locality ${pred.commit.hash} `
                        + `${pred.path.path}. Retry quantification of locality`)
                    const commit = [{hash: pred.commit.hash, localities: [pred], paths: [pred.path.path]}]










                    // TODO: SonarQube neuste Version nicht installiert, vlt. Framework etc. updaten? Peerdep klappt net?
                    measurement = await this.sonarQube.quantifyCommit(commit, 0, quantifications)

                    if (measurement == null) {
                        this.logger.error("Error: Could not get measurement for " +
                            `locality ${pred.commit.hash} ${pred.path.path}`)
                        continue
                    }
                    measurements.push(measurement)
                }


            }
        }
    )
        await this.quantifyLocalities()

        // TODO: 1. alle Preds für localities holen
        // TODO: 2. alle Preds die noch nicht quantifiziert wurden in ein array speichern
        // TODO: 3. alle Cached Preds in LocalityMap speichern, alle übrigens quantifizieren mit unten liegendem code
        // TODO: 4. Neue quantifizierte Elemente: DB müsste entweder appenden oder Cache muss das übernehmen?

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

        this.logger.info("Total commits: ", commits.length)

        this.logger.info("Starting quantifying...")
        // quantifying each commit
        for (let i = 0; i < commits.length; i++) {
            this.logger.info(`Quantifying commit ${i + 1} of ${commits.length}. Hash: ${commits[i].hash}`);
            // check for quantifications in cache
            if (commits[i].paths.length == 0 || commits[i].paths[0] == undefined) {
                this.logger.info("ignoring commit as no paths are left to quantify for this commit. If you like",
                    "to inject on empty paths see pathsHandling-injections")
                return
            }

            const succeeded = await this.checkCache(commits[i].localities, quantifications)
            if (succeeded) {
                this.logger.info("Successfully retrieved measurements from cache")
                continue
            }
            const measurements = await this.sonarQube.quantifyCommit(commits, i, quantifications)

            commits[i].localities.forEach(locality => {
                this.logger.info(`Writing measurements for locality ${locality.commit.hash}` +
                    ` ${locality.path.path} to cache.`)
                this.cache.set(locality, measurements[i])
            })
        }
    }

    private getNPredecessorsMap(localitiesToQuantify: CommitPath[], allLocalities: CommitPath[])
        : LocalityMap<CommitPath, CommitPath[]> {

        // get all nPredecessors for each locality of localities to quantify
        if (this.uniqueMode) {
            CommitPath.setPredecessorDelegation(new PredecessorsUnique(this.logger))
        }
        return CommitPath.getNPredecessorsMap(localitiesToQuantify, this.n, this.upToN, allLocalities)
    }

    private getNotQuantifiedLocs(localitiesToQuantify: CommitPath[],
                                 nPredecessorsMap: LocalityMap<CommitPath, CommitPath[]>): CommitPath[] {

        // calculate all localities which are not quantified yet
        const locsNotQuantified = new Map<string, CommitPath[]>()
        for (let i = 0; i < localitiesToQuantify.length; i++) {
            const loc = localitiesToQuantify[i]
            const nPredecessors = nPredecessorsMap.getVal(loc)

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

        let succeeded = true
        const measurements: SonarQubeMeasurement[] = []
        for (const cp of localities) {
            const measurement = await this.cache.get(cp)
            if (measurement == null) {
                succeeded = false
                return
            }
            measurements.push(measurement)
        }

        if (succeeded) {
            for (let i = 0; i < localities.length; i++) {
                quantifications.set(localities[i], measurements[i])
            }
        }

        return succeeded
    }

}