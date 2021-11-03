import {CommitPath} from "bugfinder-localityrecorder-commitpath";
import {DB, LocalityMap, SHARED_TYPES, WriteMode} from "bugfinder-framework";
import {SonarQubeMeasurement} from "bugfinder-commitpath-quantifier-sonarqube";
import {inject, injectable, optional} from "inversify";
import {BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES} from "../../TYPES";
import {Logger} from "ts-log";

/**
 * Meomization technique. This is a cache to prevent costly quantifications of localities
 */
export interface Cache {
    init(): Promise<void>

    set(locality: CommitPath, measurement: SonarQubeMeasurement): Promise<void>

    get(locality: CommitPath): Promise<SonarQubeMeasurement>
}

@injectable()
export class RAMCache implements Cache {
    @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.db)
    db: DB<CommitPath, any, SonarQubeMeasurement>;

    @inject(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.cacheID)
    cacheID: string

    @optional() @inject(SHARED_TYPES.logger)
    logger: Logger

    data: LocalityMap<CommitPath, SonarQubeMeasurement>

    constructor() {
        console.log("TEST")
    }

    async init() {
        this.logger?.info("Initializing Cache...")
        this.data = await this.db.readQuantifications(this.cacheID)
    }

    async get(locality: CommitPath): Promise<SonarQubeMeasurement> {
        return this.data.getVal(locality)
    }

    async set(locality: CommitPath, measurement: SonarQubeMeasurement) {
        const el = await this.get(locality)
        const tmpMap = new LocalityMap<CommitPath, SonarQubeMeasurement>()
        tmpMap.set(locality, measurement)
        if (el == null) {
            await this.db.writeQuantifications(tmpMap, this.cacheID, WriteMode.append)
            this.data.set(locality, measurement)
        }
    }

}