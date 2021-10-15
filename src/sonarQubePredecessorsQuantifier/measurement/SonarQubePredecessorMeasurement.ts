import {SonarQubeMeasurement, SonarQubeMeasures} from "bugfinder-commitpath-quantifier-sonarqube";
import {PredecessorMeasures} from "./Elements";
import {
    MaxDiffVisitor, MaxRelDiffVisitor,
    MaxValVisitor, MeanDiffVisitor, MeanRelDiffVisitor, MeanValVisitor,
    MinDiffVisitor,
    MinRelDiffVisitor,
    MinValVisitor,
    Visitor
} from "./Visitors";

export class SonarQubePredecessorMeasurement {

    /**
     * Generates a SonarQubePredecessorMeasurement out of the n predecessor
     * CommitPath-SonarQubeMeasurements
     * @param measurements
     */
    constructor(measurements: SonarQubeMeasurement[]) {
        // @formatter:off
        const minValVisitor         = new MinValVisitor()
        const maxValVisitor         = new MaxValVisitor()
        const meanValVisitor        = new MeanValVisitor()
        const minDiffVisitor        = new MinDiffVisitor()
        const maxDiffVisitor        = new MaxDiffVisitor()
        const meanDiffVisitor       = new MeanDiffVisitor()
        const minRelDiffVisitor     = new MinRelDiffVisitor()
        const maxRelDiffVisitor     = new MaxRelDiffVisitor()
        const meanRelDiffVisitor    = new MeanRelDiffVisitor()
        // @formatter:on

        // @formatter:off
        this.visitPredecessorMeasures(minValVisitor     , measurements, this.minVal)
        this.visitPredecessorMeasures(maxValVisitor     , measurements, this.maxVal)
        this.visitPredecessorMeasures(meanValVisitor    , measurements, this.meanVal)
        this.visitPredecessorMeasures(minDiffVisitor    , measurements, this.minDiff)
        this.visitPredecessorMeasures(maxDiffVisitor    , measurements, this.maxDiff)
        this.visitPredecessorMeasures(meanDiffVisitor   , measurements, this.meanDiff)
        this.visitPredecessorMeasures(minRelDiffVisitor , measurements, this.minRelDiff)
        this.visitPredecessorMeasures(maxRelDiffVisitor , measurements, this.maxRelDiff)
        this.visitPredecessorMeasures(meanRelDiffVisitor, measurements, this.meanRelDiff)
        // @formatter:on
    }

    /**
     * Writes SonarQubeMeasures with Visitor from measurements
     * Visits a PredecessorMeasures with visitor and visitor writes result to result
     * @param visitor
     * @param measurements
     * @param result
     * @private
     */
    private visitPredecessorMeasures<T>(visitor: Visitor<number>, measurements: SonarQubeMeasurement[],
                                        result: SonarQubeMeasures) {

        const predMeasures = this.generatePredecessorMeasures(measurements)
        let i = 0
        for (const key in measurements[0].measures) {
            predMeasures[i].accept(visitor, result[key])
            i++
        }
    }

    /**
     * Generates a PredecessorMeasures for each property in SonarQubeMeasures
     * out of measurements: SonarQubeMeasurement[]
     * @param measurements
     * @private
     */
    private generatePredecessorMeasures(measurements: SonarQubeMeasurement[]): PredecessorMeasures<number>[] {

        const predMeasures: PredecessorMeasures<number>[] = []
        // for each SonarQubeMeasures-Property: f.e. cognitiveComplexity, classes, lines, ...
        let i = 0
        for (const key in measurements[0].measures) {
            predMeasures[i] = new PredecessorMeasures<number>()

            // push for each measurement the key: f.e. for 5 measurements push the cognitiveComplexity
            // to predMeasures[cognitiveComplexity]
            for (const measurement of measurements) {
                predMeasures[i].measures.push(measurement.measures[key])
            }
            i++
        }
        return predMeasures
    }

    // @formatter:off
    minVal:         SonarQubeMeasures = new SonarQubeMeasures()
    maxVal:         SonarQubeMeasures = new SonarQubeMeasures()
    meanVal:        SonarQubeMeasures = new SonarQubeMeasures()
    minDiff:        SonarQubeMeasures = new SonarQubeMeasures()
    maxDiff:        SonarQubeMeasures = new SonarQubeMeasures()
    meanDiff:       SonarQubeMeasures = new SonarQubeMeasures()
    minRelDiff:     SonarQubeMeasures = new SonarQubeMeasures()
    maxRelDiff:     SonarQubeMeasures = new SonarQubeMeasures()
    meanRelDiff:    SonarQubeMeasures = new SonarQubeMeasures()
    // @formatter:on
}
