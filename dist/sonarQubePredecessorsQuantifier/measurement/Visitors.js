"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mean = exports.MeanRelDiffVisitor = exports.MaxRelDiffVisitor = exports.MinRelDiffVisitor = exports.MeanDiffVisitor = exports.MaxDiffVisitor = exports.MinDiffVisitor = exports.MeanValVisitor = exports.MaxValVisitor = exports.MinValVisitor = void 0;
var underscore_1 = __importDefault(require("underscore"));
/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *                                           Visitors
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
var MinValVisitor = /** @class */ (function () {
    function MinValVisitor() {
    }
    MinValVisitor.prototype.visit = function (element, result) {
        result.value = underscore_1.default.min(element.measures.map(function (el) {
            return el.value;
        }));
        result.name = "min_val_" + element[0].name;
    };
    return MinValVisitor;
}());
exports.MinValVisitor = MinValVisitor;
var MaxValVisitor = /** @class */ (function () {
    function MaxValVisitor() {
    }
    MaxValVisitor.prototype.visit = function (element, result) {
        result.value = underscore_1.default.max(element.measures.map(function (el) {
            return el.value;
        }));
        result.name = "max_val_" + element[0].name;
    };
    return MaxValVisitor;
}());
exports.MaxValVisitor = MaxValVisitor;
var MeanValVisitor = /** @class */ (function () {
    function MeanValVisitor() {
    }
    MeanValVisitor.prototype.visit = function (element, result) {
        result.value = mean(element.measures.map(function (el) {
            return el.value;
        }));
        result.name = "mean_val_" + element[0].name;
    };
    return MeanValVisitor;
}());
exports.MeanValVisitor = MeanValVisitor;
var MinDiffVisitor = /** @class */ (function () {
    function MinDiffVisitor() {
    }
    MinDiffVisitor.prototype.visit = function (element, result) {
        var measures = element.measures;
        var diffs = arrayMapToDiffs(measures);
        result.value = underscore_1.default.min(diffs);
        result.name = "min_diff_" + element[0].name;
    };
    return MinDiffVisitor;
}());
exports.MinDiffVisitor = MinDiffVisitor;
var MaxDiffVisitor = /** @class */ (function () {
    function MaxDiffVisitor() {
    }
    MaxDiffVisitor.prototype.visit = function (element, result) {
        var measures = element.measures;
        var diffs = arrayMapToDiffs(measures);
        result.value = underscore_1.default.max(diffs);
        result.name = "max_diff_" + element[0].name;
    };
    return MaxDiffVisitor;
}());
exports.MaxDiffVisitor = MaxDiffVisitor;
var MeanDiffVisitor = /** @class */ (function () {
    function MeanDiffVisitor() {
    }
    MeanDiffVisitor.prototype.visit = function (element, result) {
        var measures = element.measures;
        var diffs = arrayMapToDiffs(measures);
        result.value = mean(diffs);
        result.name = "mean_diff_" + element[0].name;
    };
    return MeanDiffVisitor;
}());
exports.MeanDiffVisitor = MeanDiffVisitor;
var MinRelDiffVisitor = /** @class */ (function () {
    function MinRelDiffVisitor() {
    }
    MinRelDiffVisitor.prototype.visit = function (element, result) {
        var measures = element.measures;
        var relDiffs = arrayMapToRelDiff(measures);
        result.value = underscore_1.default.min(relDiffs);
        result.name = "min_rel_diff_" + element[0].name;
    };
    return MinRelDiffVisitor;
}());
exports.MinRelDiffVisitor = MinRelDiffVisitor;
var MaxRelDiffVisitor = /** @class */ (function () {
    function MaxRelDiffVisitor() {
    }
    MaxRelDiffVisitor.prototype.visit = function (element, result) {
        var measures = element.measures;
        var relDiffs = arrayMapToRelDiff(measures);
        result.value = underscore_1.default.max(relDiffs);
        result.name = "max_rel_diff_" + element[0].name;
    };
    return MaxRelDiffVisitor;
}());
exports.MaxRelDiffVisitor = MaxRelDiffVisitor;
var MeanRelDiffVisitor = /** @class */ (function () {
    function MeanRelDiffVisitor() {
    }
    MeanRelDiffVisitor.prototype.visit = function (element, result) {
        var measures = element.measures;
        var relDiffs = arrayMapToRelDiff(measures);
        result.value = mean(relDiffs);
        result.name = "mean_rel_diff_" + element[0].name;
    };
    return MeanRelDiffVisitor;
}());
exports.MeanRelDiffVisitor = MeanRelDiffVisitor;
/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *                                           Helper functions
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */
function mean(array) {
    if (array.length == 0)
        return null;
    if (array.length == 1)
        return array[0];
    var sum = array.reduce(function (a, b) { return a + b; }, 0);
    return sum / array.length;
}
exports.mean = mean;
function diff(curMeasure, index, measures) {
    if (index + 1 > measures.length - 1)
        return null;
    return curMeasure.value - measures[index + 1].value;
}
function relDiff(curMeasure, index, measures) {
    if (index + 1 > measures.length - 1)
        return null;
    return (curMeasure.value - measures[index + 1].value) / measures[index + 1].value;
}
function arrayMapToDiffs(measures) {
    return measures.map(function (curMeasure, index) {
        return diff(curMeasure, index, measures);
    }).filter(function (el) {
        return el != null;
    });
}
function arrayMapToRelDiff(measures) {
    return measures.map(function (curMeasure, index) {
        return relDiff(curMeasure, index, measures);
    }).filter(function (el) {
        return el != null;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlzaXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc29uYXJRdWJlUHJlZGVjZXNzb3JzUXVhbnRpZmllci9tZWFzdXJlbWVudC9WaXNpdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSwwREFBMEI7QUFPMUI7Ozs7R0FJRztBQUdIO0lBQUE7SUFRQSxDQUFDO0lBTkcsNkJBQUssR0FBTCxVQUFNLE9BQW9DLEVBQUUsTUFBdUI7UUFDL0QsTUFBTSxDQUFDLEtBQUssR0FBRyxvQkFBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEVBQUU7WUFDeEMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDSCxNQUFNLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0lBQzlDLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBUlksc0NBQWE7QUFVMUI7SUFBQTtJQVFBLENBQUM7SUFORyw2QkFBSyxHQUFMLFVBQU0sT0FBb0MsRUFBRSxNQUF1QjtRQUMvRCxNQUFNLENBQUMsS0FBSyxHQUFHLG9CQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsRUFBRTtZQUN4QyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUE7UUFDbkIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNILE1BQU0sQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7SUFDOUMsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFSWSxzQ0FBYTtBQVUxQjtJQUFBO0lBUUEsQ0FBQztJQU5HLDhCQUFLLEdBQUwsVUFBTSxPQUFvQyxFQUFFLE1BQXVCO1FB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