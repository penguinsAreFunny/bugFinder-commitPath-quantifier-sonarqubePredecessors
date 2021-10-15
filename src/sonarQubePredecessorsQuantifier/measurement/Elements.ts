import {Measure} from "bugfinder-commitpath-quantifier-sonarqube";
import {Visitor} from "./Visitors";

export interface Element<T> {
    accept(visitor: Visitor<T>, result: Measure<T>)
}

/**
 * Contains measures of SonarQubeMeasurements beginning with newest measures (higher commit.order)
 * ending with oldest (lower commit.order)
 */
export class PredecessorMeasures<T> implements Element<T> {
    measures: Measure<T>[] = []

    accept(visitor: Visitor<T>, result: Measure<T>) {
        visitor.visit(this, result)
    }
}
