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
exports.SonarQubePredecessorMeasurement = void 0;
var bugfinder_commitpath_quantifier_sonarqube_1 = require("bugfinder-commitpath-quantifier-sonarqube");
var Elements_1 = require("./Elements");
var Visitors_1 = require("./Visitors");
var SonarQubePredecessorMeasurement = /** @class */ (function () {
    /**
     * Generates a SonarQubePredecessorMeasurement out of the n predecessor
     * CommitPath-SonarQubeMeasurements
     * @param measurements
     */
    function SonarQubePredecessorMeasurement(measurements) {
        // @formatter:off
        this.minVal = new bugfinder_commitpath_quantifier_sonarqube_1.SonarQubeMeasures();
        this.maxVal = new bugfinder_commitpath_quantifier_sonarqube_1.SonarQubeMeasures();
        this.meanVal = new bugfinder_commitpath_quantifier_sonarqube_1.SonarQubeMeasures();
        this.minDiff = new bugfinder_commitpath_quantifier_sonarqube_1.SonarQubeMeasures();
        this.maxDiff = new bugfinder_commitpath_quantifier_sonarqube_1.SonarQubeMeasures();
        this.meanDiff = new bugfinder_commitpath_quantifier_sonarqube_1.SonarQubeMeasures();
        this.minRelDiff = new bugfinder_commitpath_quantifier_sonarqube_1.SonarQubeMeasures();
        this.maxRelDiff = new bugfinder_commitpath_quantifier_sonarqube_1.SonarQubeMeasures();
        this.meanRelDiff = new bugfinder_commitpath_quantifier_sonarqube_1.SonarQubeMeasures();
        // @formatter:off
        var minValVisitor = new Visitors_1.MinValVisitor();
        var maxValVisitor = new Visitors_1.MaxValVisitor();
        var meanValVisitor = new Visitors_1.MeanValVisitor();
        var minDiffVisitor = new Visitors_1.MinDiffVisitor();
        var maxDiffVisitor = new Visitors_1.MaxDiffVisitor();
        var meanDiffVisitor = new Visitors_1.MeanDiffVisitor();
        var minRelDiffVisitor = new Visitors_1.MinRelDiffVisitor();
        var maxRelDiffVisitor = new Visitors_1.MaxRelDiffVisitor();
        var meanRelDiffVisitor = new Visitors_1.MeanRelDiffVisitor();
        // @formatter:on
        // @formatter:off
        this.visitPredecessorMeasures(minValVisitor, measurements, this.minVal);
        this.visitPredecessorMeasures(maxValVisitor, measurements, this.maxVal);
        this.visitPredecessorMeasures(meanValVisitor, measurements, this.meanVal);
        this.visitPredecessorMeasures(minDiffVisitor, measurements, this.minDiff);
        this.visitPredecessorMeasures(maxDiffVisitor, measurements, this.maxDiff);
        this.visitPredecessorMeasures(meanDiffVisitor, measurements, this.meanDiff);
        this.visitPredecessorMeasures(minRelDiffVisitor, measurements, this.minRelDiff);
        this.visitPredecessorMeasures(maxRelDiffVisitor, measurements, this.maxRelDiff);
        this.visitPredecessorMeasures(meanRelDiffVisitor, measurements, this.meanRelDiff);
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
    SonarQubePredecessorMeasurement.prototype.visitPredecessorMeasures = function (visitor, measurements, result) {
        var predMeasures = this.generatePredecessorMeasures(measurements);
        var i = 0;
        for (var key in measurements[0].measures) {
            predMeasures[i].accept(visitor, result[key]);
            i++;
        }
    };
    /**
     * Generates a PredecessorMeasures for each property in SonarQubeMeasures
     * out of measurements: SonarQubeMeasurement[]
     * @param measurements
     * @private
     */
    SonarQubePredecessorMeasurement.prototype.generatePredecessorMeasures = function (measurements) {
        var e_1, _a;
        var predMeasures = [];
        // for each SonarQubeMeasures-Property: f.e. cognitiveComplexity, classes, lines, ...
        var i = 0;
        for (var key in measurements[0].measures) {
            predMeasures[i] = new Elements_1.PredecessorMeasures();
            try {
                // push for each measurement the key: f.e. for 5 measurements push the cognitiveComplexity
                // to predMeasures[cognitiveComplexity]
                for (var measurements_1 = (e_1 = void 0, __values(measurements)), measurements_1_1 = measurements_1.next(); !measurements_1_1.done; measurements_1_1 = measurements_1.next()) {
                    var measurement = measurements_1_1.value;
                    predMeasures[i].measures.push(measurement.measures[key]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (measurements_1_1 && !measurements_1_1.done && (_a = measurements_1.return)) _a.call(measurements_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            i++;
        }
        return predMeasures;
    };
    return SonarQubePredecessorMeasurement;
}());
exports.SonarQubePredecessorMeasurement = SonarQubePredecessorMeasurement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29uYXJRdWJlUHJlZGVjZXNzb3JNZWFzdXJlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zb25hclF1YmVQcmVkZWNlc3NvcnNRdWFudGlmaWVyL21lYXN1cmVtZW50L1NvbmFyUXViZVByZWRlY2Vzc29yTWVhc3VyZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1R0FBa0c7QUFDbEcsdUNBQStDO0FBQy9DLHVDQU9vQjtBQUVwQjtJQUVJOzs7O09BSUc7SUFDSCx5Q0FBWSxZQUFvQztRQXFFaEQsaUJBQWlCO1FBQ2pCLFdBQU0sR0FBOEIsSUFBSSw2REFBaUIsRUFBRSxDQUFBO1FBQzNELFdBQU0sR0FBOEIsSUFBSSw2REFBaUIsRUFBRSxDQUFBO1FBQzNELFlBQU8sR0FBNkIsSUFBSSw2REFBaUIsRUFBRSxDQUFBO1FBQzNELFlBQU8sR0FBNkIsSUFBSSw2REFBaUIsRUFBRSxDQUFBO1FBQzNELFlBQU8sR0FBNkIsSUFBSSw2REFBaUIsRUFBRSxDQUFBO1FBQzNELGFBQVEsR0FBNEIsSUFBSSw2REFBaUIsRUFBRSxDQUFBO1FBQzNELGVBQVUsR0FBMEIsSUFBSSw2REFBaUIsRUFBRSxDQUFBO1FBQzNELGVBQVUsR0FBMEIsSUFBSSw2REFBaUIsRUFBRSxDQUFBO1FBQzNELGdCQUFXLEdBQXlCLElBQUksNkRBQWlCLEVBQUUsQ0FBQTtRQTdFdkQsaUJBQWlCO1FBQ2pCLElBQU0sYUFBYSxHQUFXLElBQUksd0JBQWEsRUFBRSxDQUFBO1FBQ2pELElBQU0sYUFBYSxHQUFXLElBQUksd0JBQWEsRUFBRSxDQUFBO1FBQ2pELElBQU0sY0FBYyxHQUFVLElBQUkseUJBQWMsRUFBRSxDQUFBO1FBQ2xELElBQU0sY0FBYyxHQUFVLElBQUkseUJBQWMsRUFBRSxDQUFBO1FBQ2xELElBQU0sY0FBYyxHQUFVLElBQUkseUJBQWMsRUFBRSxDQUFBO1FBQ2xELElBQU0sZUFBZSxHQUFT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