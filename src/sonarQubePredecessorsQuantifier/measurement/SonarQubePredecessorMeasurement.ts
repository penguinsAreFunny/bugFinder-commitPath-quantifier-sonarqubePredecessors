import {Measure, SonarQubeMeasurement} from "bugfinder-commitpath-quantifier-sonarqube";
import _ from "underscore"

export class SonarQubePredecessorMeasurement {

    /**
     * Generates a SonarQubePredecessorMeasurement out of the n predecessor
     * CommitPath-SonarQubeMeasurements
     * @param measurements
     */
    constructor(measurements: SonarQubeMeasurement[]) {
        const visitors: Visitor<number>[] = [
            new minValVisitor(),
            new maxValVisitor()
        ]

        const predMeasuresLines = new PredecessorMeasures<number>()
        for(const measurement of measurements){
            predMeasuresLines.measures.push(measurement.lines)
        }

        for(const visitor of visitors){
            predMeasuresLines.accept(visitor, this.lineMeasures)
        }

    }

    cognitiveComplexity = new Measure<number>()
    duplicatedLinesDensity = new Measure<number>()
    securityRating = new Measure<number>()
    blockerViolations = new Measure<number>()
    duplicatedBlocks = new Measure<number>()
    vulnerabilities = new Measure<number>()
    classes = new Measure<number>()
    securityReviewRating = new Measure<number>()
    functions = new Measure<number>()
    sqaleIndex = new Measure<number>()
    bugs = new Measure<number>()
    infoViolations = new Measure<number>()
    coverage = new Measure<number>()
    generatedNcloc = new Measure<number>()
    lines = new Measure<number>()
    ncloc = new Measure<number>()
    generatedLines = new Measure<number>()
    linesToCover = new Measure<number>()
    reopenedIssues = new Measure<number>()
    confirmedIssues = new Measure<number>()
    testSuccessDensity = new Measure<number>()
    securityHotspots = new Measure<number>()
    majorViolations = new Measure<number>()
    violations = new Measure<number>()
    uncoveredLines = new Measure<number>()
    minorViolations = new Measure<number>()
    criticalViolations = new Measure<number>()
    falsePositiveIssues = new Measure<number>()
    statements = new Measure<number>()
    testFailures = new Measure<number>()
    duplicatedFiles = new Measure<number>()
    reliabilityRemediationEffort = new Measure<number>()
    commentLinesDensity = new Measure<number>()
    lineCoverage = new Measure<number>()
    sqaleDebtRatio = new Measure<number>()
    sqaleRating = new Measure<number>()
    reliabilityRating = new Measure<number>()
    files = new Measure<number>()
    wontFixIssues = new Measure<number>()
    skippedTests = new Measure<number>()
    codeSmells = new Measure<number>()
    effortToReachMaintainabilityRatingA = new Measure<number>()
    complexity = new Measure<number>()
    commentLines = new Measure<number>()
    duplicatedLines = new Measure<number>()
    securityRemediationEffort = new Measure<number>()
    openIssues = new Measure<number>()
    testErrors = new Measure<number>()
}

export interface Visitor<T> {
    visit(element: Element<T>, result: Measure<T>)
}

export interface Element<T> {
    accept(visitor: Visitor<T>, result: Measure<T>)
}

export class PredecessorMeasures<T> implements Element<T>{
    measures: Measure<T>[]

    accept(visitor: Visitor<T>, result: Measure<T>) {
        visitor.visit(this, result)
    }
}

export class minValVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>){
        result.value = _.min(element.measures.map(el => {return el.value}))
        result.name = "min_val_" + element[0].name
    }
}

export class maxValVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>){
        result.value = _.max(element.measures.map(el => {return el.value}))
        result.name = "min_val_" + element[0].name
    }
}