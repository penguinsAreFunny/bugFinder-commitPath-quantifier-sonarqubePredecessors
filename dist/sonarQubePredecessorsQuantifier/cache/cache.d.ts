import { CommitPath } from "bugfinder-localityrecorder-commitpath";
import { DB, LocalityMap } from "bugfinder-framework";
import { SonarQubeMeasurement } from "bugfinder-commitpath-quantifier-sonarqube";
import { Logger } from "ts-log";
/**
 * Meomization technique. This is a cache to prevent costly quantifications of localities
 */
export interface Cache {
    init(): Promise<void>;
    set(locality: CommitPath, measurement: SonarQubeMeasurement): Promise<void>;
    get(locality: CommitPath): Promise<SonarQubeMeasurement>;
}
export declare class RAMCache implements Cache {
    db: DB<CommitPath, any, SonarQubeMeasurement>;
    cacheID: string;
    logger: Logger;
    data: LocalityMap<CommitPath, SonarQubeMeasurement>;
    constructor();
    init(): Promise<void>;
    get(locality: CommitPath): Promise<SonarQubeMeasurement>;
    set(locality: CommitPath, measurement: SonarQubeMeasurement): Promise<void>;
}
