"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mean = exports.max = exports.min = exports.MeanRelDiffVisitor = exports.MaxRelDiffVisitor = exports.MinRelDiffVisitor = exports.MeanDiffVisitor = exports.MaxDiffVisitor = exports.MinDiffVisitor = exports.MeanValVisitor = exports.MaxValVisitor = exports.MinValVisitor = void 0;
/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *                                           Visitors
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
var MinValVisitor = /** @class */ (function () {
    function MinValVisitor() {
    }
    MinValVisitor.prototype.visit = function (element, result) {
        if (element.measures == null || element.measures.length == 0) {
            result = null;
            return;
        }
        var values = element.measures.map(function (el) {
            return el === null || el === void 0 ? void 0 : el.value;
        }).filter(function (el) {
            return el != null;
        });
        result.value = min(values);
        result.name = "min_val_" + findName(element.measures);
    };
    return MinValVisitor;
}());
exports.MinValVisitor = MinValVisitor;
var MaxValVisitor = /** @class */ (function () {
    function MaxValVisitor() {
    }
    MaxValVisitor.prototype.visit = function (element, result) {
        if (element.measures == null || element.measures.length == 0) {
            result = null;
            return;
        }
        var values = element.measures.map(function (el) {
            return el === null || el === void 0 ? void 0 : el.value;
        }).filter(function (el) {
            return el != null;
        });
        result.value = max(values);
        result.name = "max_val_" + findName(element.measures);
    };
    return MaxValVisitor;
}());
exports.MaxValVisitor = MaxValVisitor;
var MeanValVisitor = /** @class */ (function () {
    function MeanValVisitor() {
    }
    MeanValVisitor.prototype.visit = function (element, result) {
        if (element.measures == null || element.measures.length == 0) {
            result = null;
            return;
        }
        var values = element.measures.map(function (el) {
            return el === null || el === void 0 ? void 0 : el.value;
        }).filter(function (el) {
            return el != null;
        });
        result.value = mean(values);
        result.name = "mean_val_" + findName(element.measures);
    };
    return MeanValVisitor;
}());
exports.MeanValVisitor = MeanValVisitor;
var MinDiffVisitor = /** @class */ (function () {
    function MinDiffVisitor() {
    }
    MinDiffVisitor.prototype.visit = function (element, result) {
        if (element.measures == null || element.measures.length == 0) {
            result = null;
            return;
        }
        var measures = element.measures;
        var diffs = arrayMapToDiffs(measures);
        result.value = min(diffs);
        result.name = "min_diff_" + findName(measures);
    };
    return MinDiffVisitor;
}());
exports.MinDiffVisitor = MinDiffVisitor;
var MaxDiffVisitor = /** @class */ (function () {
    function MaxDiffVisitor() {
    }
    MaxDiffVisitor.prototype.visit = function (element, result) {
        if (element.measures == null || element.measures.length == 0) {
            result = null;
            return;
        }
        var measures = element.measures;
        var diffs = arrayMapToDiffs(measures);
        result.value = max(diffs);
        result.name = "max_diff_" + findName(measures);
    };
    return MaxDiffVisitor;
}());
exports.MaxDiffVisitor = MaxDiffVisitor;
var MeanDiffVisitor = /** @class */ (function () {
    function MeanDiffVisitor() {
    }
    MeanDiffVisitor.prototype.visit = function (element, result) {
        if (element.measures == null || element.measures.length == 0) {
            result = null;
            return;
        }
        var measures = element.measures;
        var diffs = arrayMapToDiffs(measures);
        result.value = mean(diffs);
        result.name = "mean_diff_" + findName(measures);
    };
    return MeanDiffVisitor;
}());
exports.MeanDiffVisitor = MeanDiffVisitor;
var MinRelDiffVisitor = /** @class */ (function () {
    function MinRelDiffVisitor() {
    }
    MinRelDiffVisitor.prototype.visit = function (element, result) {
        if (element.measures == null || element.measures.length == 0) {
            result = null;
            return;
        }
        var measures = element.measures;
        var relDiffs = arrayMapToRelDiff(measures);
        result.value = min(relDiffs);
        result.name = "min_rel_diff_" + findName(measures);
    };
    return MinRelDiffVisitor;
}());
exports.MinRelDiffVisitor = MinRelDiffVisitor;
var MaxRelDiffVisitor = /** @class */ (function () {
    function MaxRelDiffVisitor() {
    }
    MaxRelDiffVisitor.prototype.visit = function (element, result) {
        if (element.measures == null || element.measures.length == 0) {
            result = null;
            return;
        }
        var measures = element.measures;
        var relDiffs = arrayMapToRelDiff(measures);
        result.value = max(relDiffs);
        result.name = "max_rel_diff_" + findName(measures);
    };
    return MaxRelDiffVisitor;
}());
exports.MaxRelDiffVisitor = MaxRelDiffVisitor;
var MeanRelDiffVisitor = /** @class */ (function () {
    function MeanRelDiffVisitor() {
    }
    MeanRelDiffVisitor.prototype.visit = function (element, result) {
        if (element.measures == null || element.measures.length == 0) {
            result = null;
            return;
        }
        var measures = element.measures;
        var relDiffs = arrayMapToRelDiff(measures);
        result.value = mean(relDiffs);
        result.name = "mean_rel_diff_" + findName(measures);
    };
    return MeanRelDiffVisitor;
}());
exports.MeanRelDiffVisitor = MeanRelDiffVisitor;
/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *                                           Helper functions
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
function findName(measures) {
    var e_1, _a;
    try {
        for (var measures_1 = __values(measures), measures_1_1 = measures_1.next(); !measures_1_1.done; measures_1_1 = measures_1.next()) {
            var measure = measures_1_1.value;
            if ((measure === null || measure === void 0 ? void 0 : measure.name) != null)
                return measure.name;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (measures_1_1 && !measures_1_1.done && (_a = measures_1.return)) _a.call(measures_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return "";
}
function min(array) {
    if (array == null)
        return null;
    var min = array[0];
    for (var i = 1; i < array.length; i++) {
        var cur = array[i];
        if (cur != null && cur < min)
            min = cur;
    }
    return min;
}
exports.min = min;
function max(array) {
    if (array == null)
        return null;
    var max = array[0];
    for (var i = 1; i < array.length; i++) {
        var cur = array[i];
        if (cur != null && cur > max)
            max = cur;
    }
    return max;
}
exports.max = max;
function mean(array) {
    var e_2, _a;
    if (array == null || array.length == 0)
        return null;
    if (array.length == 1)
        return array[0] == null ? null : array[0];
    var sum = null;
    var notNullElements = 0;
    try {
        for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
            var el = array_1_1.value;
            if (el == null)
                continue;
            notNullElements++;
            if (sum == null) {
                sum = el;
                continue;
            }
            sum += el;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return sum == null ? null : sum / notNullElements;
}
exports.mean = mean;
function diff(curMeasure, index, measures) {
    if (index + 1 > measures.length - 1)
        return null;
    if (curMeasure == null || curMeasure.value == null || measures[index + 1] == null)
        return null;
    return curMeasure.value - measures[index + 1].value;
}
function relDiff(curMeasure, index, measures) {
    if (index + 1 > measures.length - 1)
        return null;
    if (curMeasure == null || curMeasure.value == null || measures[index + 1] == null)
        return null;
    if (curMeasure.value == measures[index + 1].value)
        return 0; // 0 to 0 => no change
    return (curMeasure.value - measures[index + 1].value) / measures[index + 1].value;
}
function arrayMapToDiffs(measures) {
    if (measures.length == 0 || measures.length == 1)
        return null;
    var diffs = measures.map(function (curMeasure, index) {
        return diff(curMeasure, index, measures);
    }).filter(function (el) {
        return el != null;
    });
    return diffs.length == 0 ? null : diffs;
}
function arrayMapToRelDiff(measures) {
    if (measures.length == 0 || measures.length == 1)
        return null;
    var relDiffs = measures.map(function (curMeasure, index) {
        return relDiff(curMeasure, index, measures);
    }).filter(function (el) {
        return el != null;
    });
    return relDiffs.length == 0 ? null : relDiffs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlzaXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc29uYXJRdWJlUHJlZGVjZXNzb3JzUXVhbnRpZmllci9tZWFzdXJlbWVudC9WaXNpdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQU9BOzs7O0dBSUc7QUFHSDtJQUFBO0lBZUEsQ0FBQztJQWJHLDZCQUFLLEdBQUwsVUFBTSxPQUFvQyxFQUFFLE1BQXVCO1FBQy9ELElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQzFELE1BQU0sR0FBRyxJQUFJLENBQUE7WUFDYixPQUFNO1NBQ1Q7UUFDRCxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEVBQUU7WUFDbEMsT0FBTyxFQUFFLGFBQUYsRUFBRSx1QkFBRixFQUFFLENBQUUsS0FBSyxDQUFBO1FBQ3BCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEVBQUU7WUFDUixPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUE7UUFDckIsQ0FBQyxDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMxQixNQUFNLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3pELENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUFmRCxJQWVDO0FBZlksc0NBQWE7QUFpQjFCO0lBQUE7SUFlQSxDQUFDO0lBYkcsNkJBQUssR0FBTCxVQUFNLE9BQW9DLEVBQUUsTUFBdUI7UUFDL0QsSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDMUQsTUFBTSxHQUFHLElB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