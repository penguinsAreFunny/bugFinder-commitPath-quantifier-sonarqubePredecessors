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
var measurement_1 = require("./measurement");
var SonarQubePredecessorsQuantifier = /** @class */ (function () {
    function SonarQubePredecessorsQuantifier() {
    }
    SonarQubePredecessorsQuantifier.prototype.quantify = function (localitiesToQuantify, allLocalities) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var nPredecessorsMap, notQuantifiedLocs, sonarQubeQuantifications, quantifications, x, _j, _k, el, predecessors, predecessors_1, predecessors_1_1, pred, measurement, e_1_1, e_2_1, _l, _m, el, predecessorsMeasurements, predecessors, i, pred, measurement, commit, currentCommitPath, predecessorsMeasurement, e_3_1;
            var e_2, _o, e_1, _p, e_3, _q;
            return __generator(this, function (_r) {
                switch (_r.label) {
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
                        _r.sent();
                        nPredecessorsMap = this.getNPredecessorsMap(localitiesToQuantify, allLocalities);
                        notQuantifiedLocs = this.getNotQuantifiedLocs(localitiesToQuantify, nPredecessorsMap);
                        sonarQubeQuantifications = new bugfinder_framework_1.LocalityMap();
                        quantifications = new bugfinder_framework_1.LocalityMap();
                        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.info("Got " + notQuantifiedLocs.length + " not quantified localities.");
                        if (!(notQuantifiedLocs.length > 0)) return [3 /*break*/, 3];
                        (_c = this.logger) === null || _c === void 0 ? void 0 : _c.info("Quantifying not quantified localities...");
                        return [4 /*yield*/, this.quantifyLocalities(notQuantifiedLocs, sonarQubeQuantifications)];
                    case 2:
                        _r.sent();
                        _r.label = 3;
                    case 3:
                        (_d = this.logger) === null || _d === void 0 ? void 0 : _d.info("Quantifying all localities and their predecessors while using cache...");
                        x = 0;
                        _r.label = 4;
                    case 4:
                        _r.trys.push([4, 15, 16, 17]);
                        _j = __values((nPredecessorsMap.toArray())), _k = _j.next();
                        _r.label = 5;
                    case 5:
                        if (!!_k.done) return [3 /*break*/, 14];
                        el = _k.value;
                        predecessors = el.val;
                        if (predecessors == null)
                            return [3 /*break*/, 13];
                        _r.label = 6;
                    case 6:
                        _r.trys.push([6, 11, 12, 13]);
                        predecessors_1 = (e_1 = void 0, __values(predecessors)), predecessors_1_1 = predecessors_1.next();
                        _r.label = 7;
                    case 7:
                        if (!!predecessors_1_1.done) return [3 /*break*/, 10];
                        pred = predecessors_1_1.value;
                        return [4 /*yield*/, this.cache.get(pred)];
                    case 8:
                        measurement = _r.sent();
                        if (measurement == null) {
                            x++;
                            (_e = this.logger) === null || _e === void 0 ? void 0 : _e.debug("SonarQubePredecessorsQuantifier: Not found in cache: ", pred.commit.order, pred.path.path);
                        }
                        _r.label = 9;
                    case 9:
                        predecessors_1_1 = predecessors_1.next();
                        return [3 /*break*/, 7];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_1_1 = _r.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (predecessors_1_1 && !predecessors_1_1.done && (_p = predecessors_1.return)) _p.call(predecessors_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 13:
                        _k = _j.next();
                        return [3 /*break*/, 5];
                    case 14: return [3 /*break*/, 17];
                    case 15:
                        e_2_1 = _r.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 17];
                    case 16:
                        try {
                            if (_k && !_k.done && (_o = _j.return)) _o.call(_j);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 17:
                        (_f = this.logger) === null || _f === void 0 ? void 0 : _f.debug("SonarQubePredecessorsQuantifier: Total not found CPs: ", x);
                        _r.label = 18;
                    case 18:
                        _r.trys.push([18, 29, 30, 31]);
                        _l = __values((nPredecessorsMap.toArray())), _m = _l.next();
                        _r.label = 19;
                    case 19:
                        if (!!_m.done) return [3 /*break*/, 28];
                        el = _m.value;
                        predecessorsMeasurements = [];
                        predecessors = el.val;
                        if (predecessors == null) {
                            quantifications.set(el.key, null);
                            return [3 /*break*/, 27];
                        }
                        i = 0;
                        _r.label = 20;
                    case 20:
                        if (!(i < predecessors.length)) return [3 /*break*/, 26];
                        if (i == 0 && !this.useThisCommitPath)
                            return [3 /*break*/, 25];
                        pred = predecessors[i];
                        return [4 /*yield*/, this.cache.get(pred)];
                    case 21:
                        measurement = _r.sent();
                        if (!(measurement == null)) return [3 /*break*/, 24];
                        // retry quantification
                        (_g = this.logger) === null || _g === void 0 ? void 0 : _g.info("Quantification not found in cache for locality " + pred.commit.hash + " "
                            + (pred.path.path + ". Retrying quantification of locality..."));
                        commit = [{ hash: pred.commit.hash, localities: [pred], paths: [pred.path.path] }];
                        return [4 /*yield*/, this.sonarQube.quantifyCommit(commit, 0, sonarQubeQuantifications)];
                    case 22:
                        measurement = (_r.sent())[0];
                        if (measurement == null) {
                            // retry failed
                            (_h = this.logger) === null || _h === void 0 ? void 0 : _h.error("Error: Could not get measurement for " +
                                ("locality " + pred.commit.hash + " " + pred.path.path));
                            return [3 /*break*/, 25];
                        }
                        return [4 /*yield*/, this.cache.set(pred, measurement)];
                    case 23:
                        _r.sent();
                        _r.label = 24;
                    case 24:
                        predecessorsMeasurements.push(measurement);
                        _r.label = 25;
                    case 25:
                        i++;
                        return [3 /*break*/, 20];
                    case 26:
                        currentCommitPath = el.key;
                        predecessorsMeasurement = new measurement_1.SonarQubePredecessorMeasurement(predecessorsMeasurements);
                        quantifications.set(currentCommitPath, predecessorsMeasurement);
                        _r.label = 27;
                    case 27:
                        _m = _l.next();
                        return [3 /*break*/, 19];
                    case 28: return [3 /*break*/, 31];
                    case 29:
                        e_3_1 = _r.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 31];
                    case 30:
                        try {
                            if (_m && !_m.done && (_q = _l.return)) _q.call(_l);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 31: return [2 /*return*/, quantifications];
                }
            });
        });
    };
    SonarQubePredecessorsQuantifier.prototype.quantifyLocalities = function (localities, quantifications) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var hashes, commits, _loop_1, localities_1, localities_1_1, locality, i, succeeded, measurements, _g, _h, locality, e_4_1;
            var e_5, _j, e_4, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
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
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (localities_1_1 && !localities_1_1.done && (_j = localities_1.return)) _j.call(localities_1);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info("Total commits: ", commits.length);
                        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.info("Starting quantifying...");
                        i = 0;
                        _l.label = 1;
                    case 1:
                        if (!(i < commits.length)) return [3 /*break*/, 12];
                        (_c = this.logger) === null || _c === void 0 ? void 0 : _c.info("Quantifying commit " + (i + 1) + " of " + commits.length + ". Hash: " + commits[i].hash);
                        // check for quantifications in cache
                        if (commits[i].paths.length == 0 || commits[i].paths[0] == undefined) {
                            (_d = this.logger) === null || _d === void 0 ? void 0 : _d.info("ignoring commit as no paths are left to quantify for this commit. If you like", "to inject on empty paths see pathsHandling-injections");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.checkCache(commits[i].localities, quantifications)];
                    case 2:
                        succeeded = _l.sent();
                        if (succeeded) {
                            (_e = this.logger) === null || _e === void 0 ? void 0 : _e.info("Successfully retrieved measurements from cache");
                            return [3 /*break*/, 11];
                        }
                        return [4 /*yield*/, this.sonarQube.quantifyCommit(commits, i, quantifications)];
                    case 3:
                        measurements = _l.sent();
                        _l.label = 4;
                    case 4:
                        _l.trys.push([4, 9, 10, 11]);
                        _g = (e_4 = void 0, __values(commits[i].localities)), _h = _g.next();
                        _l.label = 5;
                    case 5:
                        if (!!_h.done) return [3 /*break*/, 8];
                        locality = _h.value;
                        (_f = this.logger) === null || _f === void 0 ? void 0 : _f.info("Writing measurements for locality " + locality.commit.hash +
                            (" " + locality.path.path + " to cache."));
                        return [4 /*yield*/, this.cache.set(locality, measurements[i])];
                    case 6:
                        _l.sent();
                        _l.label = 7;
                    case 7:
                        _h = _g.next();
                        return [3 /*break*/, 5];
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        e_4_1 = _l.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 11];
                    case 10:
                        try {
                            if (_h && !_h.done && (_k = _g.return)) _k.call(_g);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 11:
                        i++;
                        return [3 /*break*/, 1];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    SonarQubePredecessorsQuantifier.prototype.getNPredecessorsMap = function (localitiesToQuantify, allLocalities) {
        // get all nPredecessors for each locality of localities to quantify
        if (this.uniqueMode) {
            bugfinder_localityrecorder_commitpath_1.CommitPath.setPredecessorDelegation(new bugfinder_localityrecorder_commitpath_1.PredecessorsUnique(this.logger));
        }
        return bugfinder_localityrecorder_commitpath_1.CommitPath.getNPredecessorsMap(localitiesToQuantify, this.n, this.upToN, this.uniqueMode, allLocalities);
    };
    SonarQubePredecessorsQuantifier.prototype.getNotQuantifiedLocs = function (localitiesToQuantify, nPredecessorsMap) {
        var e_6, _a, e_7, _b, e_8, _c;
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
                    for (var nPredecessors_1 = (e_7 = void 0, __values(nPredecessors)), nPredecessors_1_1 = nPredecessors_1.next(); !nPredecessors_1_1.done; nPredecessors_1_1 = nPredecessors_1.next()) {
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
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (nPredecessors_1_1 && !nPredecessors_1_1.done && (_b = nPredecessors_1.return)) _b.call(nPredecessors_1);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (localitiesToQuantify_1_1 && !localitiesToQuantify_1_1.done && (_a = localitiesToQuantify_1.return)) _a.call(localitiesToQuantify_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        var locsNotQuantifiedArray = [];
        try {
            for (var _d = __values(locsNotQuantified.values()), _e = _d.next(); !_e.done; _e = _d.next()) {
                var val = _e.value;
                locsNotQuantifiedArray.push.apply(locsNotQuantifiedArray, __spreadArray([], __read(val), false));
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
            }
            finally { if (e_8) throw e_8.error; }
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
            var measurements, localities_2, localities_2_1, cp, measurement, e_9_1, i;
            var e_9, _a;
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
                        e_9_1 = _b.sent();
                        e_9 = { error: e_9_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (localities_2_1 && !localities_2_1.done && (_a = localities_2.return)) _a.call(localities_2);
                        }
                        finally { if (e_9) throw e_9.error; }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29uYXJRdWJlUHJlZGVjZXNzb3JzUXVhbnRpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zb25hclF1YmVQcmVkZWNlc3NvcnNRdWFudGlmaWVyL3NvbmFyUXViZVByZWRlY2Vzc29yc1F1YW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXVEO0FBQ3ZELDhEQUE4RDtBQUM5RCxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsOERBQThEO0FBQzlELDJEQUEwRTtBQUMxRSwrRkFBb0Y7QUFHcEYsa0NBQXFGO0FBQ3JGLHVHQUFvRztBQUNwRyw2Q0FBOEQ7QUFHOUQ7SUFBQTtJQXNPQSxDQUFDO0lBaE5TLGtEQUFRLEdBQWQsVUFBZSxvQkFBa0MsRUFBRSxhQUEyQjs7Ozs7Ozs7d0JBRTFFOzs7OzsyQkFLRzt3QkFDSCxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFBO3dCQUNoRSxxQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTs0QkFJdkIsaUVBQWlFOzBCQUoxQzs7d0JBQXZCLFNBQXVCLENBQUE7d0JBS2pCLGdCQUFnQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsRUFBRSxhQUFhLENBQUMsQ0FBQTt3QkFDaEYsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixFQUFFLGdCQUFnQixDQUFDLENBQUE7d0JBQ3JGLHdCQUF3QixHQUFHLElBQUksaUNBQVcsRUFBb0MsQ0FBQTt3QkFDOUUsZUFBZSxHQUFHLElBQUksaUNBQVcsRUFBK0MsQ0FBQTt3QkFFdEYsTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxJQUFJLENBQUMsU0FBTyxpQkFBaUIsQ0FBQyxNQUFNLGdDQUE2QixDQUFDLENBQUE7NkJBQzNFLENBQUEsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQSxFQUE1Qix3QkFBNEI7d0JBQzVCLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsSUFBSSxDQUFDLDBDQUEwQyxDQUFDLENBQUE7d0JBQzdELHFCQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsRUFBRSx3QkFBd0IsQ0FBQyxFQUFBOzt3QkFBMUUsU0FBMEUsQ0FBQTs7O3dCQUc5RSxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQyx3RUFBd0UsQ0FBQyxDQUFBO3dCQUV2RixDQUFDLEdBQUcsQ0FBQyxDQUFBOzs7O3dCQUNRLEtBQUEsU0FBQSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7Ozs7d0JBQWxDLEVBQUU7d0JBQ0gsWUFBWSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUE7d0JBQzNCLElBQUksWUFBWSxJQUFJLElBQUk7NEJBQUUseUJBQVE7Ozs7d0JBRWYsZ0NBQUEsU0FBQSxZQUFZLENBQUEsQ0FBQTs7Ozt3QkFBcEIsSUFBSTt3QkFDUyxxQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQXhDLFdBQVcsR0FBRyxTQUEwQjt3QkFDOUMsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFOzRCQUNyQixDQUFDLEVBQUUsQ0FBQTs0QkFDSCxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLEtBQUssQ0FBQyx1REFBdUQsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO3lCQUNqSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFHVCxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLEtBQUssQ0FBQyx3REFBd0QsRUFBRSxDQUFDLENBQUMsQ0FBQTs7Ozt3QkFFOUQsS0FBQSxTQUFBLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTs7Ozt3QkFBbEMsRUFBRTt3QkFDSCx3QkFBd0IsR0FBRyxFQUFFLENBQUE7d0JBQzdCLFlBQVksR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFBO3dCQUMzQixJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUU7NEJBQ3RCLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTs0QkFDakMseUJBQVE7eUJBQ1g7d0JBR1EsQ0FBQyxHQUFHLENBQUM7Ozs2QkFBRSxDQUFBLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFBO3dCQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCOzRCQUFFLHlCQUFRO3dCQUV6QyxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO3dCQUNZLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBOUQsV0FBVyxHQUF5QixTQUEwQjs2QkFDOUQsQ0FBQSxXQUFXLElBQUksSUFBSSxDQUFBLEVBQW5CLHlCQUFtQjt3QkFDbkIsdUJBQXVCO3dCQUN2QixNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQyxvREFBa0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQUc7K0JBQzlFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSw2Q0FBMEMsQ0FBQSxDQUFDLENBQUE7d0JBQzVELE1BQU0sR0FBRyxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFBO3dCQUN2RSxxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLHdCQUF3QixDQUFDLEVBQUE7O3dCQUF2RixXQUFXLEdBQUcsQ0FBQyxTQUF3RSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7d0JBRTNGLElBQUksV0FBVyxJQUFJLElBQUksRUFBRTs0QkFDckIsZUFBZTs0QkFDZixNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLEtBQUssQ0FBQyx1Q0FBdUM7aUNBQ3RELGNBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFNLENBQUEsQ0FBQyxDQUFBOzRCQUNyRCx5QkFBUTt5QkFDWDt3QkFDRCxxQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLEVBQUE7O3dCQUF2QyxTQUF1QyxDQUFBOzs7d0JBRTNDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTs7O3dCQXBCTCxDQUFDLEVBQUUsQ0FBQTs7O3dCQXdCdEMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQTt3QkFDMUIsdUJBQXVCLEdBQUcsSUFBSSw2Q0FBK0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO3dCQUM3RixlQUFlLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLHVCQUF1QixDQUFDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBSW5FLHNCQUFPLGVBQWUsRUFBQTs7OztLQUN6QjtJQUVhLDREQUFrQixHQUFoQyxVQUFpQyxVQUF3QixFQUN4QixlQUE4RDs7Ozs7Ozs7d0JBR3JGLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQzt3QkFDckMsT0FBTyxHQUFrRSxFQUFFLENBQUE7NENBRXBFLFFBQVE7NEJBQ2YsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztrREFBVzs0QkFDckQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFFcEMsSUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUc7Z0NBQ3JDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUE7NEJBQ25ELENBQUMsQ0FBQyxDQUFBOzRCQUVGLElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQSxVQUFVOztnQ0FDcEMsT0FBTyxNQUFBLFVBQVUsQ0FBQyxJQUFJLDBDQUFFLElBQUksQ0FBQTs0QkFDaEMsQ0FBQyxDQUFDLENBQUE7NEJBRUYsT0FBTyxDQUFDLElBQUksQ0FBQztnQ0FDVCxJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJO2dDQUMxQixVQUFVLEVBQUUsV0FBVztnQ0FDdkIsS0FBSyxFQUFFLEtBQUs7NkJBQ2YsQ0FBQyxDQUFDOzs7NEJBaEJQLEtBQXVCLGVBQUEsU0FBQSxVQUFVLENBQUE7Z0NBQXRCLFFBQVE7d0NBQVIsUUFBUTs2QkFpQmxCOzs7Ozs7Ozs7d0JBRUQsTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO3dCQUVwRCxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO3dCQUVuQyxDQUFDLEdBQUcsQ0FBQzs7OzZCQUFFLENBQUEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUE7d0JBQzlCLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsSUFBSSxDQUFDLHlCQUFzQixDQUFDLEdBQUcsQ0FBQyxhQUFPLE9BQU8sQ0FBQyxNQUFNLGdCQUFXLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFNLENBQUMsQ0FBQzt3QkFDaEcscUNBQXFDO3dCQUNyQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBRTs0QkFDbEUsTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxJQUFJLENBQUMsK0VBQStFLEVBQzdGLHVEQUF1RCxDQUFDLENBQUE7NEJBQzVELHNCQUFNO3lCQUNUO3dCQUVpQixxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLEVBQUE7O3dCQUF6RSxTQUFTLEdBQUcsU0FBNkQ7d0JBQy9FLElBQUksU0FBUyxFQUFFOzRCQUNYLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsSUFBSSxDQUFDLGdEQUFnRCxDQUFDLENBQUE7NEJBQ25FLHlCQUFRO3lCQUNYO3dCQUNvQixxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxFQUFBOzt3QkFBL0UsWUFBWSxHQUFHLFNBQWdFOzs7O3dCQUUvRCxvQkFBQSxTQUFBLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUEsQ0FBQTs7Ozt3QkFBakMsUUFBUTt3QkFDZCxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQyx1Q0FBcUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFNOzZCQUN6RSxNQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFZLENBQUEsQ0FBQyxDQUFBO3dCQUN2QyxxQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUE7O3dCQUEvQyxTQUErQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFuQm5CLENBQUMsRUFBRSxDQUFBOzs7Ozs7S0FzQjFDO0lBRU8sNkRBQW1CLEdBQTNCLFVBQTRCLG9CQUFrQyxFQUFFLGFBQTJCO1FBR3ZGLG9FQUFvRTtRQUNwRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsa0RBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLDBEQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1NBQzNFO1FBQ0QsT0FBTyxrREFBVSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFDMUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBRU8sOERBQW9CLEdBQTVCLFVBQTZCLG9CQUFrQyxFQUNsQyxnQkFBdUQ7O1FBRWhGLHdEQUF3RDtRQUN4RCxJQUFNLGlCQUFpQixHQUFHLElBQUksR0FBRyxFQUF3QixDQUFBOztZQUV6RCxLQUFrQixJQUFBLHlCQUFBLFNBQUEsb0JBQW9CLENBQUEsMERBQUEsNEZBQUU7Z0JBQW5DLElBQU0sR0FBRyxpQ0FBQTtnQkFFVixJQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ2xELDhEQUE4RDtnQkFDOUQsSUFBSSxhQUFhLElBQUksSUFBSTtvQkFBRSxTQUFROztvQkFFbkMsS0FBc0IsSUFBQSxpQ0FBQSxTQUFBLGFBQWEsQ0FBQSxDQUFBLDRDQUFBLHVFQUFFO3dCQUFoQyxJQUFNLE9BQU8sMEJBQUE7d0JBQ2QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUU7NEJBQ2pDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTs0QkFDekIsSUFBTSxPQUFPLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBOzRCQUMxQyxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0NBQ2pCLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBOzZCQUN4QztpQ0FBTTtnQ0FDSCxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyx5Q0FBTSxPQUFPLFlBQUUsT0FBTyxVQUFFLENBQUE7NkJBQ3BEO3lCQUNKO3FCQUNKOzs7Ozs7Ozs7YUFFSjs7Ozs7Ozs7O1FBRUQsSUFBTSxzQkFBc0IsR0FBaUIsRUFBRSxDQUFBOztZQUMvQyxLQUFrQixJQUFBLEtBQUEsU0FBQSxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBekMsSUFBTSxHQUFHLFdBQUE7Z0JBQ1Ysc0JBQXNCLENBQUMsSUFBSSxPQUEzQixzQkFBc0IsMkJBQVMsR0FBRyxXQUFDO2FBQ3RDOzs7Ozs7Ozs7UUFFRCxPQUFPLHNCQUFzQixDQUFBO0lBQ2pDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNHLG9EQUFVLEdBQWhCLFVBQWlCLFVBQXdCLEVBQUUsZUFBOEQ7Ozs7Ozs7d0JBRy9GLFlBQVksR0FBMkIsRUFBRSxDQUFBOzs7O3dCQUM5QixlQUFBLFNBQUEsVUFBVSxDQUFBOzs7O3dCQUFoQixFQUFFO3dCQUNXLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFBOzt3QkFBdEMsV0FBVyxHQUFHLFNBQXdCO3dCQUM1QyxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7NEJBQ3JCLHNCQUFPLEtBQUssRUFBQTt5QkFDZjt3QkFDRCxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFHbEMsS0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUN4QyxlQUFlLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt5QkFDdEQ7d0JBRUQsc0JBQU8sSUFBSSxFQUFBOzs7O0tBQ2Q7SUFsT0Q7UUFEQyxJQUFBLG9CQUFRLEdBQUU7UUFBRSxJQUFBLGtCQUFNLEVBQUMsa0NBQVksQ0FBQyxNQUFNLENBQUM7O21FQUMxQjtJQUdkO1FBREMsSUFBQSxrQkFBTSxFQUFDLG1FQUEyRCxDQUFDLEtBQUssQ0FBQzs7a0VBQzlEO0lBR1o7UUFEQyxJQUFBLGtCQUFNLEVBQUMsbUVBQTJELENBQUMsQ0FBQyxDQUFDOzs4REFDN0Q7SUFHVDtRQURDLElBQUEsa0JBQU0sRUFBQyxtRUFBMkQsQ0FBQyxLQUFLLENBQUM7O2tFQUM1RDtJQUdkO1FBREMsSUFBQSxrQkFBTSxFQUFDLG1FQUEyRCxDQUFDLFVBQVUsQ0FBQzs7dUVBQzVEO0lBR25CO1FBREMsSUFBQSxrQkFBTSxFQUFDLG1FQUEyRCxDQUFDLGlCQUFpQixDQUFDOzs4RUFDNUQ7SUFHMUI7UUFEQyxJQUFBLGtCQUFNLEVBQUMsbUVBQTJELENBQUMsU0FBUyxDQUFDO2tDQUNuRSwrREFBbUI7c0VBQUE7SUFwQnJCLCtCQUErQjtRQUQzQyxJQUFBLHNCQUFVLEdBQUU7T0FDQSwrQkFBK0IsQ0FzTzNDO0lBQUQsc0NBQUM7Q0FBQSxBQXRPRCxJQXNPQztBQXRPWSwwRUFBK0IifQ==