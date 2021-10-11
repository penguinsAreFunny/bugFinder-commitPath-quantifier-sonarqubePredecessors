import { SonarQubeConfig } from "./sonarQubeConfig";
import { LocalityMap, Quantifier } from "bugfinder-framework";
import { CommitPath } from "bugfinder-localityrecorder-commitpath";
import { Git } from "bugfinder-localityrecorder-commit";
import { SonarQubeMeasurement } from "./sonarQubeMeasurement";
import { Logger } from "ts-log";
export declare class SonarQubeQuantifier implements Quantifier<CommitPath, SonarQubeMeasurement> {
    logger: Logger;
    sonarQubeConfig: SonarQubeConfig;
    git: Git;
    quantify(localities: CommitPath[]): Promise<LocalityMap<CommitPath, SonarQubeMeasurement>>;
    private runPreHooks;
    private checkoutCommit;
    private sonarQubeQuantify;
}
