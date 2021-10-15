"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SonarQubePredecessorsQuantifier = void 0;
var inversify_1 = require("inversify");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var axios = require("axios");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var bugfinder_framework_1 = require("bugfinder-framework");
var bugfinder_localityrecorder_commitpath_1 = require("bugfinder-localityrecorder-commitpath");
var TYPES_1 = require("../TYPES");
var bugfinder_commitpath_quantifier_sonarqube_1 = require("bugfinder-commitpath-quantifier-sonarqube");
var SonarQubePredecessorMeasurement_1 = require("./measurement/SonarQubePredecessorMeasurement");
var SonarQubePredecessorsQuantifier = /** @class */ (function () {
    function SonarQubePredecessorsQuantifier() {
    }
    SonarQubePredecessorsQuantifier.prototype.quantify = function (localitiesToQuantify, allLocalities) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var nPredecessorsMap, notQuantifiedLocs, sonarQubeQuantifications, quantifications, missingMeasurements, _f, _g, el, predecessorsMeasurements, predecessors, i, pred, measurement, commit, currentCommitPath, predecessorsMeasurement, e_1_1;
            var e_1, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        /**
                         * merge all CommitPaths which are in the same commit
                         * performance optimization
                         * git checkout and SonarQube-quantification is costly therefore only run this process once
                         * for each commit
                         */
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info("SonarQubePredecessorsQuantifier starting...");
                        return [4 /*yield*/, this.cache.init()
                            // quantify localities not quantified already and write to cache.
                        ];
                    case 1:
                        _j.sent();
                        nPredecessorsMap = this.getNPredecessorsMap(localitiesToQuantify, allLocalities);
                        notQuantifiedLocs = this.getNotQuantifiedLocs(localitiesToQuantify, nPredecessorsMap);
                        sonarQubeQuantifications = new bugfinder_framework_1.LocalityMap();
                        quantifications = new bugfinder_framework_1.LocalityMap();
                        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.info("Quantifying not quantified localities...");
                        return [4 /*yield*/, this.quantifyLocalities(notQuantifiedLocs, sonarQubeQuantifications)];
                    case 2:
                        _j.sent();
                        (_c = this.logger) === null || _c === void 0 ? void 0 : _c.info("Quantifying all localities and their predecessors while using cache...");
                        missingMeasurements = [];
                        _j.label = 3;
                    case 3:
                        _j.trys.push([3, 13, 14, 15]);
                        _f = __values((nPredecessorsMap.toArray())), _g = _f.next();
                        _j.label = 4;
                    case 4:
                        if (!!_g.done) return [3 /*break*/, 12];
                        el = _g.value;
                        predecessorsMeasurements = [];
                        predecessors = el.val;
                        i = 0;
                        _j.label = 5;
                    case 5:
                        if (!(i < predecessors.length)) return [3 /*break*/, 10];
                        if (i == 0 && !this.useThisCommitPath)
                            return [3 /*break*/, 9];
                        pred = predecessors[i];
                        return [4 /*yield*/, this.cache.get(pred)];
                    case 6:
                        measurement = _j.sent();
                        src;
                        if (!(measurement == null)) return [3 /*break*/, 8];
                        // retry quantification
                        (_d = this.logger) === null || _d === void 0 ? void 0 : _d.warn("Missing quantification for locality " + pred.commit.hash + " "
                            + (pred.path.path + ". Retry quantification of locality"));
                        commit = [{ hash: pred.commit.hash, localities: [pred], paths: [pred.path.path] }];
                        return [4 /*yield*/, this.sonarQube.quantifyCommit(commit, 0, sonarQubeQuantifications)];
                    case 7:
                        measurement = (_j.sent())[0];
                        if (measurement == null) {
                            // retry failed
                            (_e = this.logger) === null || _e === void 0 ? void 0 : _e.error("Error: Could not get measurement for " +
                                ("locality " + pred.commit.hash + " " + pred.path.path));
                            return [3 /*break*/, 9];
                        }
                        _j.label = 8;
                    case 8:
                        predecessorsMeasurements.push(measurement);
                        _j.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 5];
                    case 10:
                        currentCommitPath = predecessors[0];
                        predecessorsMeasurement = new SonarQubePredecessorMeasurement_1.SonarQubePredecessorMeasurement(predecessorsMeasurements);
                        quantifications.set(currentCommitPath, predecessorsMeasurement);
                        _j.label = 11;
                    case 11:
                        _g = _f.next();
                        return [3 /*break*/, 4];
                    case 12: return [3 /*break*/, 15];
                    case 13:
                        e_1_1 = _j.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 15];
                    case 14:
                        try {
                            if (_g && !_g.done && (_h = _f.return)) _h.call(_f);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 15: return [2 /*return*/, quantifications];
                }
            });
        });
    };
    SonarQubePredecessorsQuantifier.prototype.quantifyLocalities = function (localities, quantifications) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var hashes, commits, _loop_1, localities_1, localities_1_1, locality, _loop_2, this_1, i, state_1;
            var e_2, _f;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        hashes = new Map();
                        commits = [];
                        _loop_1 = function (locality) {
                            if (hashes.get(locality.commit.hash) === 1)
                                return "continue";
                            hashes.set(locality.commit.hash, 1);
                            var commitPaths = localities.filter(function (loc) {
                                return loc.commit.hash === locality.commit.hash;
                            });
                            var paths = commitPaths.map(function (commitPath) {
                                var _a;
                                return (_a = commitPath.path) === null || _a === void 0 ? void 0 : _a.path;
                            });
                            commits.push({
                                hash: locality.commit.hash,
                                localities: commitPaths,
                                paths: paths
                            });
                        };
                        try {
                            for (localities_1 = __values(localities), localities_1_1 = localities_1.next(); !localities_1_1.done; localities_1_1 = localities_1.next()) {
                                locality = localities_1_1.value;
                                _loop_1(locality);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (localities_1_1 && !localities_1_1.done && (_f = localities_1.return)) _f.call(localities_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info("Total commits: ", commits.length);
                        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.info("Starting quantifying...");
                        _loop_2 = function (i) {
                            var succeeded, measurements;
                            return __generator(this, function (_h) {
                                switch (_h.label) {
                                    case 0:
                                        (_c = this_1.logger) === null || _c === void 0 ? void 0 : _c.info("Quantifying commit " + (i + 1) + " of " + commits.length + ". Hash: " + commits[i].hash);
                                        // check for quantifications in cache
                                        if (commits[i].paths.length == 0 || commits[i].paths[0] == undefined) {
                                            (_d = this_1.logger) === null || _d === void 0 ? void 0 : _d.info("ignoring commit as no paths are left to quantify for this commit. If you like", "to inject on empty paths see pathsHandling-injections");
                                            return [2 /*return*/, { value: void 0 }];
                                        }
                                        return [4 /*yield*/, this_1.checkCache(commits[i].localities, quantifications)];
                                    case 1:
                                        succeeded = _h.sent();
                                        if (succeeded) {
                                            (_e = this_1.logger) === null || _e === void 0 ? void 0 : _e.info("Successfully retrieved measurements from cache");
                                            return [2 /*return*/, "continue"];
                                        }
                                        return [4 /*yield*/, this_1.sonarQube.quantifyCommit(commits, i, quantifications)];
                                    case 2:
                                        measurements = _h.sent();
                                        commits[i].localities.forEach(function (locality) {
                                            var _a;
                                            (_a = _this.logger) === null || _a === void 0 ? void 0 : _a.info("Writing measurements for locality " + locality.commit.hash +
                                                (" " + locality.path.path + " to cache."));
                                            _this.cache.set(locality, measurements[i]);
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _g.label = 1;
                    case 1:
                        if (!(i < commits.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_2(i)];
                    case 2:
                        state_1 = _g.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _g.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SonarQubePredecessorsQuantifier.prototype.getNPredecessorsMap = function (localitiesToQuantify, allLocalities) {
        // get all nPredecessors for each locality of localities to quantify
        if (this.uniqueMode) {
            bugfinder_localityrecorder_commitpath_1.CommitPath.setPredecessorDelegation(new bugfinder_localityrecorder_commitpath_1.PredecessorsUnique(this.logger));
        }
        return bugfinder_localityrecorder_commitpath_1.CommitPath.getNPredecessorsMap(localitiesToQuantify, this.n, this.upToN, allLocalities);
    };
    SonarQubePredecessorsQuantifier.prototype.getNotQuantifiedLocs = function (localitiesToQuantify, nPredecessorsMap) {
        var e_3, _a, e_4, _b, e_5, _c;
        // calculate all localities which are not quantified yet
        var locsNotQuantified = new Map();
        try {
            for (var localitiesToQuantify_1 = __values(localitiesToQuantify), localitiesToQuantify_1_1 = localitiesToQuantify_1.next(); !localitiesToQuantify_1_1.done; localitiesToQuantify_1_1 = localitiesToQuantify_1.next()) {
                var loc = localitiesToQuantify_1_1.value;
                var nPredecessors = nPredecessorsMap.getVal(loc);
                try {
                    for (var nPredecessors_1 = (e_4 = void 0, __values(nPredecessors)), nPredecessors_1_1 = nPredecessors_1.next(); !nPredecessors_1_1.done; nPredecessors_1_1 = nPredecessors_1.next()) {
                        var predLoc = nPredecessors_1_1.value;
                        if (this.cache.get(predLoc) == null) {
                            var key = predLoc.key();
                            var current = locsNotQuantified.get(key);
                            if (current == null) {
                                locsNotQuantified.set(key, [predLoc]);
                            }
                            else {
                                locsNotQuantified.set(key, __spreadArray(__spreadArray([], __read(current), false), [predLoc], false));
                            }
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (nPredecessors_1_1 && !nPredecessors_1_1.done && (_b = nPredecessors_1.return)) _b.call(nPredecessors_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (localitiesToQuantify_1_1 && !localitiesToQuantify_1_1.done && (_a = localitiesToQuantify_1.return)) _a.call(localitiesToQuantify_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var locsNotQuantifiedArray = [];
        try {
            for (var _d = __values(locsNotQuantified.values()), _e = _d.next(); !_e.done; _e = _d.next()) {
                var val = _e.value;
                locsNotQuantifiedArray.push.apply(locsNotQuantifiedArray, __spreadArray([], __read(val), false));
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return locsNotQuantifiedArray;
    };
    /**
     * Check cache for localities of a Commit. Returns whether all localities were found in Cache.
     * Does not set quantifications if a locality was not found.
     * @param localities
     * @param quantifications
     */
    SonarQubePredecessorsQuantifier.prototype.checkCache = function (localities, quantifications) {
        return __awaiter(this, void 0, void 0, function () {
            var measurements, localities_2, localities_2_1, cp, measurement, e_6_1, i;
            var e_6, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        measurements = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        localities_2 = __values(localities), localities_2_1 = localities_2.next();
                        _b.label = 2;
                    case 2:
                        if (!!localities_2_1.done) return [3 /*break*/, 5];
                        cp = localities_2_1.value;
                        return [4 /*yield*/, this.cache.get(cp)];
                    case 3:
                        measurement = _b.sent();
                        if (measurement == null) {
                            return [2 /*return*/, false];
                        }
                        measurements.push(measurement);
                        _b.label = 4;
                    case 4:
                        localities_2_1 = localities_2.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_6_1 = _b.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (localities_2_1 && !localities_2_1.done && (_a = localities_2.return)) _a.call(localities_2);
                        }
                        finally { if (e_6) throw e_6.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        for (i = 0; i < localities.length; i++) {
                            quantifications.set(localities[i], measurements[i]);
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    __decorate([
        (0, inversify_1.optional)(),
        (0, inversify_1.inject)(bugfinder_framework_1.SHARED_TYPES.logger),
        __metadata("design:type", Object)
    ], SonarQubePredecessorsQuantifier.prototype, "logger", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.cache),
        __metadata("design:type", Object)
    ], SonarQubePredecessorsQuantifier.prototype, "cache", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.n),
        __metadata("design:type", Number)
    ], SonarQubePredecessorsQuantifier.prototype, "n", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.upToN),
        __metadata("design:type", Boolean)
    ], SonarQubePredecessorsQuantifier.prototype, "upToN", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.uniqueMode),
        __metadata("design:type", Boolean)
    ], SonarQubePredecessorsQuantifier.prototype, "uniqueMode", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.useThisCommitPath),
        __metadata("design:type", Boolean)
    ], SonarQubePredecessorsQuantifier.prototype, "useThisCommitPath", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.sonarQube),
        __metadata("design:type", bugfinder_commitpath_quantifier_sonarqube_1.SonarQubeQuantifier)
    ], SonarQubePredecessorsQuantifier.prototype, "sonarQube", void 0);
    SonarQubePredecessorsQuantifier = __decorate([
        (0, inversify_1.injectable)()
    ], SonarQubePredecessorsQuantifier);
    return SonarQubePredecessorsQuantifier;
}());
exports.SonarQubePredecessorsQuantifier = SonarQubePredecessorsQuantifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29uYXJRdWJlUHJlZGVjZXNzb3JzUXVhbnRpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zb25hclF1YmVQcmVkZWNlc3NvcnNRdWFudGlmaWVyL3NvbmFyUXViZVByZWRlY2Vzc29yc1F1YW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXVEO0FBQ3ZELDhEQUE4RDtBQUM5RCxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsOERBQThEO0FBQzlELDJEQUEwRTtBQUMxRSwrRkFBcUY7QUFHckYsa0NBQXFGO0FBQ3JGLHVHQUFvRztBQUNwRyxpR0FBOEY7QUFHOUY7SUFBQTtJQTBNQSxDQUFDO0lBcExTLGtEQUFRLEdBQWQsVUFBZSxvQkFBa0MsRUFBRSxhQUEyQjs7Ozs7Ozs7d0JBRTFFOzs7OzsyQkFLRzt3QkFDSCxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFBO3dCQUNoRSxxQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTs0QkFFdkIsaUVBQWlFOzBCQUYxQzs7d0JBQXZCLFNBQXVCLENBQUE7d0JBR2pCLGdCQUFnQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsRUFBRSxhQUFhLENBQUMsQ0FBQTt3QkFDaEYsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixFQUFFLGdCQUFnQixDQUFDLENBQUE7d0JBQ3JGLHdCQUF3QixHQUFHLElBQUksaUNBQVcsRUFBb0MsQ0FBQTt3QkFDOUUsZUFBZSxHQUFHLElBQUksaUNBQVcsRUFBK0MsQ0FBQTt3QkFFdEYsTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxJ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