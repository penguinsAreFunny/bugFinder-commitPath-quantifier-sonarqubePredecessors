import { LocalityMap, Quantifier } from "bugfinder-framework";
import { CommitPath } from "bugfinder-localityrecorder-commitpath";
import { Logger } from "ts-log";
import { Cache } from "./cache";
import { SonarQubeMeasurement, SonarQubeQuantifier } from "bugfinder-commitpath-quantifier-sonarqube";
import { SonarQubePredecessorMeasurement } from "./measurement/SonarQubePredecessorMeasurement";
export declare class SonarQubePredecessorsQuantifier implements Quantifier<CommitPath, SonarQubePredecessorMeasurement> {
    logger: Logger;
    cache: Cache;
    n: number;
    upToN: boolean;
    uniqueMode: boolean;
    useThisCommitPath: boolean;
    sonarQube: SonarQubeQuantifier;
    quantify(localitiesToQuantify: CommitPath[], allLocalities: CommitPath[]): Promise<LocalityMap<CommitPath, SonarQubePredecessorMeasurement>>;
    private quantifyLocalities;
    private getNPredecessorsMap;
    private getNotQuantifiedLocs;
    /**
     * Check cache for localities of a Commit. Returns whether all localities were found in Cache.
     * Does not set quantifications if a locality was not found.
     * @param localities
     * @param quantifications
     */
    checkCache(localities: CommitPath[], quantifications: LocalityMap<CommitPath, SonarQubeMeasurement>): Promise<boolean>;
}
