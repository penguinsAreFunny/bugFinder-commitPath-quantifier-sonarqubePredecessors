import {Measure} from "bugfinder-commitpath-quantifier-sonarqube";
import {Element, PredecessorMeasures} from "./Elements";

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
        if (element.measures == null || element.measures.length == 0) {
            result = null
            return
        }
        const values = element.measures.map(el => {
            return el?.value
        }).filter(el => {
            return el != null
        })
        result.value = min(values)
        result.name = "min_val_" + findName(element.measures)
    }
}

export class MaxValVisitor implements Visitor<number> {

    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        if (element.measures == null || element.measures.length == 0) {
            result = null
            return
        }
        const values = element.measures.map(el => {
            return el?.value
        }).filter(el => {
            return el != null
        })
        result.value = max(values)
        result.name = "max_val_" + findName(element.measures)
    }
}

export class MeanValVisitor implements Visitor<number> {

    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        if (element.measures == null || element.measures.length == 0) {
            result = null
            return
        }
        const values = element.measures.map(el => {
            return el?.value
        }).filter(el => {
            return el != null
        })
        result.value = mean(values)
        result.name = "mean_val_" + findName(element.measures)
    }
}

export class MinDiffVisitor implements Visitor<number> {

    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        if (element.measures == null || element.measures.length == 0) {
            result = null
            return
        }
        const measures = element.measures
        const diffs = arrayMapToDiffs(measures)
        result.value = min(diffs)
        result.name = "min_diff_" + findName(measures)
    }
}

export class MaxDiffVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        if (element.measures == null || element.measures.length == 0) {
            result = null
            return
        }
        const measures = element.measures
        const diffs = arrayMapToDiffs(measures)
        result.value = max(diffs)
        result.name = "max_diff_" + findName(measures)
    }
}

export class MeanDiffVisitor implements Visitor<number> {

    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        if (element.measures == null || element.measures.length == 0) {
            result = null
            return
        }
        const measures = element.measures
        const diffs = arrayMapToDiffs(measures)
        result.value = mean(diffs)
        result.name = "mean_diff_" + findName(measures)
    }
}

export class MinRelDiffVisitor implements Visitor<number> {

    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        if (element.measures == null || element.measures.length == 0) {
            result = null
            return
        }
        const measures = element.measures
        const relDiffs = arrayMapToRelDiff(measures)
        result.value = min(relDiffs)
        result.name = "min_rel_diff_" + findName(measures)
    }
}

export class MaxRelDiffVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        if (element.measures == null || element.measures.length == 0) {
            result = null
            return
        }
        const measures = element.measures
        const relDiffs = arrayMapToRelDiff(measures)
        result.value = max(relDiffs)
        result.name = "max_rel_diff_" + findName(measures)
    }
}

export class MeanRelDiffVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>) {
        if (element.measures == null || element.measures.length == 0) {
            result = null
            return
        }
        const measures = element.measures
        const relDiffs = arrayMapToRelDiff(measures)
        result.value = mean(relDiffs)
        result.name = "mean_rel_diff_" + findName(measures)
    }
}

/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *                                           Helper functions
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

function findName(measures: Measure<number>[]): string {
    for (const measure of measures) {
        if (measure?.name != null) return measure.name
    }
    return ""
}

export function min(array: number[]) {
    if (array == null) return null
    let min = array[0]
    for (let i = 1; i < array.length; i++) {
        const cur = array[i]
        if (cur != null && cur < min) min = cur
    }
    return min
}

export function max(array: number[]) {
    if (array == null) return null
    let max = array[0]
    for (let i = 1; i < array.length; i++) {
        const cur = array[i]
        if (cur != null && cur > max) max = cur
    }
    return max
}

export function mean(array: number[]) {
    if (array == null || array.length == 0) return null
    if (array.length == 1) return array[0] == null ? null : array[0]

    let sum: number = null
    let notNullElements = 0
    for (const el of array) {
        if (el == null) continue
        notNullElements++

        if (sum == null) {
            sum = el
            continue
        }
        sum += el
    }

    return sum == null ? null : sum / notNullElements
}

function diff(curMeasure: Measure<number>, index: number, measures: Measure<number>[]) {
    if (index + 1 > measures.length - 1) return null
    if (curMeasure == null || curMeasure.value == null || measures[index + 1] == null) return null

    return curMeasure.value - measures[index + 1].value
}

function relDiff(curMeasure: Measure<number>, index: number, measures: Measure<number>[]) {
    if (index + 1 > measures.length - 1) return null
    if (curMeasure == null || curMeasure.value == null || measures[index + 1] == null) return null
    if (curMeasure.value == measures[index + 1].value) return 0 // 0 to 0 => no change
    return (curMeasure.value - measures[index + 1].value) / measures[index + 1].value
}

function arrayMapToDiffs(measures: Measure<number>[]): number[] {
    if (measures.length == 0 || measures.length == 1)
        return null

    const diffs = measures.map((curMeasure: Measure<number>, index: number) => {
        return diff(curMeasure, index, measures)
    }).filter(el => {
        return el != null
    })

    return diffs.length == 0? null : diffs
}

function arrayMapToRelDiff(measures: Measure<number>[]): number[] {
    if (measures.length == 0 || measures.length == 1)
        return null

    const relDiffs = measures.map((curMeasure: Measure<number>, index: number) => {
        return relDiff(curMeasure, index, measures)
    }).filter(el => {
        return el != null
    })

    return relDiffs.length == 0? null: relDiffs
}


