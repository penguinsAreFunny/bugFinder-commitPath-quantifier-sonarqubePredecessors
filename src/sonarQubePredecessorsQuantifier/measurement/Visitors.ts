import {Measure} from "bugfinder-commitpath-quantifier-sonarqube";
import {Element, PredecessorMeasures} from "./Elements";
import _ from "underscore"

export interface Visitor<T> {
    visit(element: Element<T>, result: Measure<T>)
}


/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *                                           Visitors
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */


export class MinValVisitor implements Visitor<number> {

    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        result.value = _.min(element.measures.map(el => {
            return el.value
        }))
        result.name = "min_val_" + element[0].name
    }
}

export class MaxValVisitor implements Visitor<number> {

    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        result.value = _.max(element.measures.map(el => {
            return el.value
        }))
        result.name = "max_val_" + element[0].name
    }
}

export class MeanValVisitor implements Visitor<number> {

    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        result.value = mean(element.measures.map(el => {
            return el.value
        }))
        result.name = "mean_val_" + element[0].name
    }
}

export class MinDiffVisitor implements Visitor<number> {

    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        const measures = element.measures
        const diffs = arrayMapToDiffs(measures)
        result.value = _.min(diffs)
        result.name = "min_diff_" + element[0].name
    }
}

export class MaxDiffVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        const measures = element.measures
        const diffs = arrayMapToDiffs(measures)
        result.value = _.max(diffs)
        result.name = "max_diff_" + element[0].name
    }
}

export class MeanDiffVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        const measures = element.measures
        const diffs = arrayMapToDiffs(measures)
        result.value = mean(diffs)
        result.name = "mean_diff_" + element[0].name
    }
}

export class MinRelDiffVisitor implements Visitor<number> {

    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        const measures = element.measures
        const relDiffs = arrayMapToRelDiff(measures)
        result.value = _.min(relDiffs)
        result.name = "min_rel_diff_" + element[0].name
    }
}

export class MaxRelDiffVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        const measures = element.measures
        const relDiffs = arrayMapToRelDiff(measures)
        result.value = _.max(relDiffs)
        result.name = "max_rel_diff_" + element[0].name
    }
}

export class MeanRelDiffVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        const measures = element.measures
        const relDiffs = arrayMapToRelDiff(measures)
        result.value = mean(relDiffs)
        result.name = "mean_rel_diff_" + element[0].name
    }
}

/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *                                           Helper functions
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

export function mean(array: number[]) {
    if (array.length == 0) return null
    if (array.length == 1) return array[0]
    const sum = array.reduce((a, b) => a + b, 0)
    return sum / array.length
}

function diff(curMeasure: Measure<number>, index: number, measures: Measure<number>[]) {
    if (index + 1 > measures.length - 1)
        return null

    return curMeasure.value - measures[index + 1].value
}

function relDiff(curMeasure: Measure<number>, index: number, measures: Measure<number>[]) {
    if (index + 1 > measures.length - 1)
        return null

    return (curMeasure.value - measures[index + 1].value) / measures[index + 1].value
}

function arrayMapToDiffs(measures: Measure<number>[]) {
    return measures.map((curMeasure: Measure<number>, index: number) => {
        return diff(curMeasure, index, measures)
    }).filter(el => {
        return el != null
    })
}

function arrayMapToRelDiff(measures: Measure<number>[]) {
    return measures.map((curMeasure: Measure<number>, index: number) => {
        return relDiff(curMeasure, index, measures)
    }).filter(el => {
        return el != null
    })
}


