import { Measure } from "bugfinder-commitpath-quantifier-sonarqube";
import { Element, PredecessorMeasures } from "./Elements";
export interface Visitor<T> {
    visit(element: Element<T>, result: Measure<T>): any;
}
/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *                                           Visitors
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
export declare class MinValVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>): void;
}
export declare class MaxValVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>): void;
}
export declare class MeanValVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>): void;
}
export declare class MinDiffVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>): void;
}
export declare class MaxDiffVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>): void;
}
export declare class MeanDiffVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>): void;
}
export declare class MinRelDiffVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>): void;
}
export declare class MaxRelDiffVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>): void;
}
export declare class MeanRelDiffVisitor implements Visitor<number> {
    visit(element: PredecessorMeasures<number>, result: Measure<number>): void;
}
export declare function min(array: number[]): number;
export declare function max(array: number[]): number;
export declare function mean(array: number[]): number;
