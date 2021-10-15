import { SonarQubeMeasurement, SonarQubeMeasures } from "bugfinder-commitpath-quantifier-sonarqube";
export declare class SonarQubePredecessorMeasurement {
    /**
     * Generates a SonarQubePredecessorMeasurement out of the n predecessor
     * CommitPath-SonarQubeMeasurements
     * @param measurements
     */
    constructor(measurements: SonarQubeMeasurement[]);
    /**
     * Writes SonarQubeMeasures with Visitor from measurements
     * Visits a PredecessorMeasures with visitor and visitor writes result to result
     * @param visitor
     * @param measurements
     * @param result
     * @private
     */
    private visitPredecessorMeasures;
    /**
     * Generates a PredecessorMeasures for each property in SonarQubeMeasures
     * out of measurements: SonarQubeMeasurement[]
     * @param measurements
     * @private
     */
    private generatePredecessorMeasures;
    minVal: SonarQubeMeasures;
    maxVal: SonarQubeMeasures;
    meanVal: SonarQubeMeasures;
    minDiff: SonarQubeMeasures;
    maxDiff: SonarQubeMeasures;
    meanDiff: SonarQubeMeasures;
    minRelDiff: SonarQubeMeasures;
    maxRelDiff: SonarQubeMeasures;
    meanRelDiff: SonarQubeMeasures;
}
