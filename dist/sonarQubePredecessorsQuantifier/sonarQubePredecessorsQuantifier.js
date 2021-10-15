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
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var nPredecessorsMap, notQuantifiedLocs, sonarQubeQuantifications, quantifications, x, _g, _h, el, predecessors, predecessors_1, predecessors_1_1, pred, measurement, e_1_1, e_2_1, _j, _k, el, predecessorsMeasurements, predecessors, i, pred, measurement, commit, currentCommitPath, predecessorsMeasurement, e_3_1;
            var e_2, _l, e_1, _m, e_3, _o;
            return __generator(this, function (_p) {
                switch (_p.label) {
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
                        _p.sent();
                        nPredecessorsMap = this.getNPredecessorsMap(localitiesToQuantify, allLocalities);
                        notQuantifiedLocs = this.getNotQuantifiedLocs(localitiesToQuantify, nPredecessorsMap);
                        sonarQubeQuantifications = new bugfinder_framework_1.LocalityMap();
                        quantifications = new bugfinder_framework_1.LocalityMap();
                        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.info("Got " + notQuantifiedLocs.length + " not quantified localities.");
                        if (!(notQuantifiedLocs.length > 0)) return [3 /*break*/, 3];
                        (_c = this.logger) === null || _c === void 0 ? void 0 : _c.info("Quantifying not quantified localities...");
                        return [4 /*yield*/, this.quantifyLocalities(notQuantifiedLocs, sonarQubeQuantifications)];
                    case 2:
                        _p.sent();
                        _p.label = 3;
                    case 3:
                        (_d = this.logger) === null || _d === void 0 ? void 0 : _d.info("Quantifying all localities and their predecessors while using cache...");
                        x = 0;
                        _p.label = 4;
                    case 4:
                        _p.trys.push([4, 15, 16, 17]);
                        _g = __values((nPredecessorsMap.toArray())), _h = _g.next();
                        _p.label = 5;
                    case 5:
                        if (!!_h.done) return [3 /*break*/, 14];
                        el = _h.value;
                        predecessors = el.val;
                        if (predecessors == null)
                            return [3 /*break*/, 13];
                        _p.label = 6;
                    case 6:
                        _p.trys.push([6, 11, 12, 13]);
                        predecessors_1 = (e_1 = void 0, __values(predecessors)), predecessors_1_1 = predecessors_1.next();
                        _p.label = 7;
                    case 7:
                        if (!!predecessors_1_1.done) return [3 /*break*/, 10];
                        pred = predecessors_1_1.value;
                        return [4 /*yield*/, this.cache.get(pred)];
                    case 8:
                        measurement = _p.sent();
                        if (measurement == null) {
                            x++;
                            console.log("Not found in cache: ", pred.commit.order, " ", pred.path.path);
                        }
                        _p.label = 9;
                    case 9:
                        predecessors_1_1 = predecessors_1.next();
                        return [3 /*break*/, 7];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_1_1 = _p.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (predecessors_1_1 && !predecessors_1_1.done && (_m = predecessors_1.return)) _m.call(predecessors_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 13:
                        _h = _g.next();
                        return [3 /*break*/, 5];
                    case 14: return [3 /*break*/, 17];
                    case 15:
                        e_2_1 = _p.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 17];
                    case 16:
                        try {
                            if (_h && !_h.done && (_l = _g.return)) _l.call(_g);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 17:
                        console.log("Total not found CPs: ", x);
                        _p.label = 18;
                    case 18:
                        _p.trys.push([18, 28, 29, 30]);
                        _j = __values((nPredecessorsMap.toArray())), _k = _j.next();
                        _p.label = 19;
                    case 19:
                        if (!!_k.done) return [3 /*break*/, 27];
                        el = _k.value;
                        predecessorsMeasurements = [];
                        predecessors = el.val;
                        if (predecessors == null) {
                            quantifications.set(el.key, null);
                            return [3 /*break*/, 26];
                        }
                        i = 0;
                        _p.label = 20;
                    case 20:
                        if (!(i < predecessors.length)) return [3 /*break*/, 25];
                        if (i == 0 && !this.useThisCommitPath)
                            return [3 /*break*/, 24];
                        pred = predecessors[i];
                        return [4 /*yield*/, this.cache.get(pred)];
                    case 21:
                        measurement = _p.sent();
                        if (!(measurement == null)) return [3 /*break*/, 23];
                        // retry quantification
                        (_e = this.logger) === null || _e === void 0 ? void 0 : _e.warn("Missing quantification for locality " + pred.commit.hash + " "
                            + (pred.path.path + ". Retry quantification of locality"));
                        commit = [{ hash: pred.commit.hash, localities: [pred], paths: [pred.path.path] }];
                        return [4 /*yield*/, this.sonarQube.quantifyCommit(commit, 0, sonarQubeQuantifications)];
                    case 22:
                        measurement = (_p.sent())[0];
                        if (measurement == null) {
                            // retry failed
                            (_f = this.logger) === null || _f === void 0 ? void 0 : _f.error("Error: Could not get measurement for " +
                                ("locality " + pred.commit.hash + " " + pred.path.path));
                            return [3 /*break*/, 24];
                        }
                        _p.label = 23;
                    case 23:
                        predecessorsMeasurements.push(measurement);
                        _p.label = 24;
                    case 24:
                        i++;
                        return [3 /*break*/, 20];
                    case 25:
                        currentCommitPath = el.key;
                        predecessorsMeasurement = new SonarQubePredecessorMeasurement_1.SonarQubePredecessorMeasurement(predecessorsMeasurements);
                        quantifications.set(currentCommitPath, predecessorsMeasurement);
                        _p.label = 26;
                    case 26:
                        _k = _j.next();
                        return [3 /*break*/, 19];
                    case 27: return [3 /*break*/, 30];
                    case 28:
                        e_3_1 = _p.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 30];
                    case 29:
                        try {
                            if (_k && !_k.done && (_o = _j.return)) _o.call(_j);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 30: return [2 /*return*/, quantifications];
                }
            });
        });
    };
    SonarQubePredecessorsQuantifier.prototype.quantifyLocalities = function (localities, quantifications) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var hashes, commits, _loop_1, localities_1, localities_1_1, locality, _loop_2, this_1, i, state_1;
            var e_4, _f;
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
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (localities_1_1 && !localities_1_1.done && (_f = localities_1.return)) _f.call(localities_1);
                            }
                            finally { if (e_4) throw e_4.error; }
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
        var e_5, _a, e_6, _b, e_7, _c;
        // calculate all localities which are not quantified yet
        var locsNotQuantified = new Map();
        try {
            for (var localitiesToQuantify_1 = __values(localitiesToQuantify), localitiesToQuantify_1_1 = localitiesToQuantify_1.next(); !localitiesToQuantify_1_1.done; localitiesToQuantify_1_1 = localitiesToQuantify_1.next()) {
                var loc = localitiesToQuantify_1_1.value;
                var nPredecessors = nPredecessorsMap.getVal(loc);
                // f.e. upToN = false and there were less than n predecessors.
                if (nPredecessors == null)
                    continue;
                try {
                    for (var nPredecessors_1 = (e_6 = void 0, __values(nPredecessors)), nPredecessors_1_1 = nPredecessors_1.next(); !nPredecessors_1_1.done; nPredecessors_1_1 = nPredecessors_1.next()) {
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
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (nPredecessors_1_1 && !nPredecessors_1_1.done && (_b = nPredecessors_1.return)) _b.call(nPredecessors_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (localitiesToQuantify_1_1 && !localitiesToQuantify_1_1.done && (_a = localitiesToQuantify_1.return)) _a.call(localitiesToQuantify_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var locsNotQuantifiedArray = [];
        try {
            for (var _d = __values(locsNotQuantified.values()), _e = _d.next(); !_e.done; _e = _d.next()) {
                var val = _e.value;
                locsNotQuantifiedArray.push.apply(locsNotQuantifiedArray, __spreadArray([], __read(val), false));
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
            }
            finally { if (e_7) throw e_7.error; }
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
            var measurements, localities_2, localities_2_1, cp, measurement, e_8_1, i;
            var e_8, _a;
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
                        e_8_1 = _b.sent();
                        e_8 = { error: e_8_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (localities_2_1 && !localities_2_1.done && (_a = localities_2.return)) _a.call(localities_2);
                        }
                        finally { if (e_8) throw e_8.error; }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29uYXJRdWJlUHJlZGVjZXNzb3JzUXVhbnRpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zb25hclF1YmVQcmVkZWNlc3NvcnNRdWFudGlmaWVyL3NvbmFyUXViZVByZWRlY2Vzc29yc1F1YW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXVEO0FBQ3ZELDhEQUE4RDtBQUM5RCxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsOERBQThEO0FBQzlELDJEQUEwRTtBQUMxRSwrRkFBb0Y7QUFHcEYsa0NBQXFGO0FBQ3JGLHVHQUFvRztBQUNwRyxpR0FBOEY7QUFHOUY7SUFBQTtJQXFPQSxDQUFDO0lBL01TLGtEQUFRLEdBQWQsVUFBZSxvQkFBa0MsRUFBRSxhQUEyQjs7Ozs7Ozs7d0JBRTFFOzs7OzsyQkFLRzt3QkFDSCxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFBO3dCQUNoRSxxQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTs0QkFFdkIsaUVBQWlFOzBCQUYxQzs7d0JBQXZCLFNBQXVCLENBQUE7d0JBR2pCLGdCQUFnQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsRUFBRSxhQUFhLENBQUMsQ0FBQTt3QkFDaEYsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixFQUFFLGdCQUFnQixDQUFDLENBQUE7d0JBQ3JGLHdCQUF3QixHQUFHLElBQUksaUNBQVcsRUFBb0MsQ0FBQTt3QkFDOUUsZUFBZSxHQUFHLElBQUksaUNBQVcsRUFBK0MsQ0FBQTt3QkFFdEYsTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxJQUFJLENBQUMsU0FBTyxpQkFBaUIsQ0FBQyxNQUFNLGdDQUE2QixDQUFDLENBQUE7NkJBQzNFLENBQUEsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQSxFQUE1Qix3QkFBNEI7d0JBQzVCLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsSUFBSSxDQUFDLDBDQUEwQyxDQUFDLENBQUE7d0JBQzdELHFCQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsRUFBRSx3QkFBd0IsQ0FBQyxFQUFBOzt3QkFBMUUsU0FBMEUsQ0FBQTs7O3dCQUc5RSxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQyx3RUFBd0UsQ0FBQyxDQUFBO3dCQUl2RixDQUFDLEdBQUcsQ0FBQyxDQUFBOzs7O3dCQUNRLEtBQUEsU0FBQSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7Ozs7d0JBQWxDLEVBQUU7d0JBQ0gsWUFBWSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUE7d0JBQzNCLElBQUksWUFBWSxJQUFJLElBQUk7NEJBQUUseUJBQVE7Ozs7d0JBRWYsZ0NBQUEsU0FBQSxZQUFZLENBQUEsQ0FBQTs7Ozt3QkFBcEIsSUFBSTt3QkFDUyxxQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQXhDLFdBQVcsR0FBRyxTQUEwQjt3QkFDOUMsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFOzRCQUNyQixDQUFDLEVBQUUsQ0FBQTs0QkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO3lCQUM5RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFHVCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFBOzs7O3dCQUd0QixLQUFBLFNBQUEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBOzs7O3dCQUFsQyxFQUFFO3dCQUNILHdCQUF3QixHQUFHLEVBQUUsQ0FBQTt3QkFDN0IsWUFBWSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUE7d0JBQzNCLElBQUksWUFBWSxJQUFJLElBQUksRUFBRTs0QkFDdEIsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBOzRCQUNqQyx5QkFBUTt5QkFDWDt3QkFHUSxDQUFDLEdBQUcsQ0FBQzs7OzZCQUFFLENBQUEsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUE7d0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUI7NEJBQUUseUJBQVE7d0JBRXpDLElBQUksR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7d0JBQ1kscUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUE5RCxXQUFXLEdBQXlCLFNBQTBCOzZCQUM5RCxDQUFBLFdBQVcsSUFBSSxJQUFJLENBQUEsRUFBbkIseUJBQW1CO3dCQUNuQix1QkFBdUI7d0JBQ3ZCLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsSUFBSSxDQUFDLHlDQUF1QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksTUFBRzsrQkFDbkUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLHVDQUFvQyxDQUFBLENBQUMsQ0FBQTt3QkFDdEQsTUFBTSxHQUFHLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUE7d0JBQ3ZFLHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsd0JBQXdCLENBQUMsRUFBQTs7d0JBQXZGLFdBQVcsR0FBRyxDQUFDLFNBQXdFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt3QkFFM0YsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFOzRCQUNyQixlQUFlOzRCQUNmLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsS0FBSyxDQUFDLHVDQUF1QztpQ0FDdEQsY0FBWSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksU0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQU0sQ0FBQSxDQUFDLENBQUE7NEJBQ3JELHlCQUFRO3lCQUNYOzs7d0JBRUwsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBOzs7d0JBbkJMLENBQUMsRUFBRSxDQUFBOzs7d0JBdUJ0QyxpQkFBaUIsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFBO3dCQUMxQix1QkFBdUIsR0FBRyxJQUFJLGlFQUErQixDQUFDLHdCQUF3QixDQUFDLENBQUE7d0JBQzdGLGVBQWUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFJbkUsc0JBQU8sZUFBZSxFQUFBOzs7O0tBQ3pCO0lBRWEsNERBQWtCLEdBQWhDLFVBQWlDLFVBQXdCLEVBQ3hCLGVBQThEOzs7Ozs7Ozs7d0JBR3JGLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQzt3QkFDckMsT0FBTyxHQUFrRSxFQUFFLENBQUE7NENBRXBFLFFBQVE7NEJBQ2YsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztrREFBVzs0QkFDckQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFFcEMsSUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUc7Z0NBQ3JDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUE7NEJBQ25ELENBQUMsQ0FBQyxDQUFBOzRCQUVGLElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQSxVQUFVOztnQ0FDcEMsT0FBTyxNQUFBLFVBQVUsQ0FBQyxJQUFJLDBDQUFFLElBQUksQ0FBQTs0QkFDaEMsQ0FBQyxDQUFDLENBQUE7NEJBRUYsT0FBTyxDQUFDLElBQUksQ0FBQztnQ0FDVCxJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJO2dDQUMxQixVQUFVLEVBQUUsV0FBVztnQ0FDdkIsS0FBSyxFQUFFLEtBQUs7NkJBQ2YsQ0FBQyxDQUFDOzs7NEJBaEJQLEtBQXVCLGVBQUEsU0FBQSxVQUFVLENBQUE7Z0NBQXRCLFFBQVE7d0NBQVIsUUFBUTs2QkFpQmxCOzs7Ozs7Ozs7d0JBRUQsTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO3dCQUVwRCxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBOzRDQUVuQyxDQUFDOzs7Ozt3Q0FDTixNQUFBLE9BQUssTUFBTSwwQ0FBRSxJQUFJLENBQUMseUJBQXNCLENBQUMsR0FBRyxDQUFDLGFBQU8sT0FBTyxDQUFDLE1BQU0sZ0JBQVcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQU0sQ0FBQyxDQUFDO3dDQUNoRyxxQ0FBcUM7d0NBQ3JDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxFQUFFOzRDQUNsRSxNQUFBLE9BQUssTUFBTSwwQ0FBRSxJQUFJLENBQUMsK0VBQStFLEVBQzdGLHVEQUF1RCxDQUFDLENBQUE7O3lDQUUvRDt3Q0FFaUIscUJBQU0sT0FBSyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsRUFBQTs7d0NBQXpFLFNBQVMsR0FBRyxTQUE2RDt3Q0FDL0UsSUFBSSxTQUFTLEVBQUU7NENBQ1gsTUFBQSxPQUFLLE1BQU0sMENBQUUsSUFBSSxDQUFDLGdEQUFnRCxDQUFDLENBQUE7O3lDQUV0RTt3Q0FDb0IscUJBQU0sT0FBSyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsZUFBZSxDQUFDLEVBQUE7O3dDQUEvRSxZQUFZLEdBQUcsU0FBZ0U7d0NBRXJGLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsUUFBUTs7NENBQ2xDLE1BQUEsS0FBSSxDQUFDLE1BQU0sMENBQUUsSUFBSSxDQUFDLHVDQUFxQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQU07aURBQ3pFLE1BQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQVksQ0FBQSxDQUFDLENBQUE7NENBQ3ZDLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt3Q0FDN0MsQ0FBQyxDQUFDLENBQUE7Ozs7Ozt3QkFwQkcsQ0FBQyxHQUFHLENBQUM7Ozs2QkFBRSxDQUFBLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFBO3NEQUF6QixDQUFDOzs7Ozs7O3dCQUEwQixDQUFDLEVBQUUsQ0FBQTs7Ozs7O0tBc0IxQztJQUVPLDZEQUFtQixHQUEzQixVQUE0QixvQkFBa0MsRUFBRSxhQUEyQjtRQUd2RixvRUFBb0U7UUFDcEUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLGtEQUFVLENBQUMsd0JBQXdCLENBQUMsSUFBSSwwREFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtTQUMzRTtRQUNELE9BQU8sa0RBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFDbEcsQ0FBQztJQUVPLDhEQUFvQixHQUE1QixVQUE2QixvQkFBa0MsRUFDbEMsZ0JBQXVEOztRQUVoRix3REFBd0Q7UUFDeEQsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsRUFBd0IsQ0FBQTs7WUFFekQsS0FBa0IsSUFBQSx5QkFBQSxTQUFBLG9CQUFvQixDQUFBLDBEQUFBLDRGQUFFO2dCQUFuQyxJQUFNLEdBQUcsaUNBQUE7Z0JBRVYsSUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNsRCw4REFBOEQ7Z0JBQzlELElBQUksYUFBYSxJQUFJLElBQUk7b0JBQUUsU0FBUTs7b0JBRW5DLEtBQXNCLElBQUEsaUNBQUEsU0FBQSxhQUFhLENBQUEsQ0FBQSw0Q0FBQSx1RUFBRTt3QkFBaEMsSUFBTSxPQUFPLDBCQUFBO3dCQUNkLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFOzRCQUNqQyxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUE7NEJBQ3pCLElBQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTs0QkFDMUMsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO2dDQUNqQixpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTs2QkFDeEM7aUNBQU07Z0NBQ0gsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcseUNBQU0sT0FBTyxZQUFFLE9BQU8sVUFBRSxDQUFBOzZCQUNwRDt5QkFDSjtxQkFDSjs7Ozs7Ozs7O2FBRUo7Ozs7Ozs7OztRQUVELElBQU0sc0JBQXNCLEdBQWlCLEVBQUUsQ0FBQTs7WUFDL0MsS0FBa0IsSUFBQSxLQUFBLFNBQUEsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQXpDLElBQU0sR0FBRyxXQUFBO2dCQUNWLHNCQUFzQixDQUFDLElBQUksT0FBM0Isc0JBQXNCLDJCQUFTLEdBQUcsV0FBQzthQUN0Qzs7Ozs7Ozs7O1FBRUQsT0FBTyxzQkFBc0IsQ0FBQTtJQUNqQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDRyxvREFBVSxHQUFoQixVQUFpQixVQUF3QixFQUFFLGVBQThEOzs7Ozs7O3dCQUcvRixZQUFZLEdBQTJCLEVBQUUsQ0FBQTs7Ozt3QkFDOUIsZUFBQSxTQUFBLFVBQVUsQ0FBQTs7Ozt3QkFBaEIsRUFBRTt3QkFDVyxxQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBQTs7d0JBQXRDLFdBQVcsR0FBRyxTQUF3Qjt3QkFDNUMsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFOzRCQUNyQixzQkFBTyxLQUFLLEVBQUE7eUJBQ2Y7d0JBQ0QsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBR2xDLEtBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDeEMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7eUJBQ3REO3dCQUVELHNCQUFPLElBQUksRUFBQTs7OztLQUNkO0lBak9EO1FBREMsSUFBQSxvQkFBUSxHQUFFO1FBQUUsSUFBQSxrQkFBTSxFQUFDLGtDQUFZLENBQUMsTUFBTSxDQUFDOzttRUFDMUI7SUFHZDtRQURDLElBQUEsa0JBQU0sRUFBQyxtRUFBMkQsQ0FBQyxLQUFLLENBQUM7O2tFQUM3RDtJQUdiO1FBREMsSUFBQSxrQkFBTSxFQUFDLG1FQUEyRCxDQUFDLENBQUMsQ0FBQzs7OERBQzdEO0lBR1Q7UUFEQyxJQUFBLGtCQUFNLEVBQUMsbUVBQTJELENBQUMsS0FBSyxDQUFDOztrRUFDNUQ7SUFHZDtRQURDLElBQUEsa0JBQU0sRUFBQyxtRUFBMkQsQ0FBQyxVQUFVLENBQUM7O3VFQUM1RDtJQUduQjtRQURDLElBQUEsa0JBQU0sRUFBQyxtRUFBMkQsQ0FBQyxpQkFBaUIsQ0FBQzs7OEVBQzVEO0lBRzFCO1FBREMsSUFBQSxrQkFBTSxFQUFDLG1FQUEyRCxDQUFDLFNBQVMsQ0FBQztrQ0FDbkUsK0RBQW1CO3NFQUFBO0lBcEJyQiwrQkFBK0I7UUFEM0MsSUFBQSxzQkFBVSxHQUFFO09BQ0EsK0JBQStCLENBcU8zQztJQUFELHNDQUFDO0NBQUEsQUFyT0QsSUFxT0M7QUFyT1ksMEVBQStCIn0=