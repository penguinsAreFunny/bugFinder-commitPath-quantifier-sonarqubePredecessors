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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SonarQubeQuantifier = void 0;
var inversify_1 = require("inversify");
var child_process_1 = require("child_process");
var sonarQubeMetrics_1 = require("./sonarQubeMetrics");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var axios = require("axios");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var propertiesReader = require("properties-reader");
var bugfinder_framework_1 = require("bugfinder-framework");
var TYPES_1 = require("../TYPES");
var sonarQubeMeasurement_1 = require("./sonarQubeMeasurement");
var moment_1 = __importDefault(require("moment"));
// TODO: Verschieben von Dateien berücksichtigen...
var SonarQubeQuantifier = /** @class */ (function () {
    function SonarQubeQuantifier() {
    }
    SonarQubeQuantifier.prototype.quantify = function (localities) {
        return __awaiter(this, void 0, void 0, function () {
            var hashes, commits, _loop_1, localities_1, localities_1_1, locality, quantifications, _loop_2, this_1, i;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        /**
                         * merge all CommitPaths which are in the same commit
                         * performance optimization
                         * git checkout and SonarQube-quantification is costly therefore only run this process once
                         * for each commit
                         */
                        this.logger.info("SonarQubePredecessorsQuantifier starting...");
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
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (localities_1_1 && !localities_1_1.done && (_a = localities_1.return)) _a.call(localities_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        quantifications = new bugfinder_framework_1.LocalityMap();
                        this.logger.info("Total commits: ", commits.length);
                        _loop_2 = function (i) {
                            var commit, beforeCheckout, err_1, afterCheckout, beforePreHooks, afterPreHooks, beforeSonarQube, measurements, afterSonarQube, preHooksTime, checkoutTime, sonarQubeTime, totalTime, estimatedTimeS, estimatedTimeM, estimatedTimeH, estimatedTimeD;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        commit = commits[i];
                                        this_1.logger.info("Quantifying commit " + (i + 1) + " of " + commits.length + ". Hash: " + commit.hash);
                                        if (commit.paths.length == 0 || commit.paths[0] == undefined) {
                                            this_1.logger.info("ignoring commit as no paths are left to quantify for this commit. If you like", "to inject on empty paths see pathsHandling-injections");
                                            return [2 /*return*/, "continue"];
                                        }
                                        beforeCheckout = (0, moment_1.default)();
                                        _c.label = 1;
                                    case 1:
                                        _c.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, this_1.checkoutCommit(commit.hash)];
                                    case 2:
                                        _c.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_1 = _c.sent();
                                        this_1.logger.error(err_1.message);
                                        return [2 /*return*/, "continue"];
                                    case 4:
                                        afterCheckout = (0, moment_1.default)();
                                        beforePreHooks = (0, moment_1.default)();
                                        try {
                                            this_1.runPreHooks();
                                        }
                                        catch (error) {
                                            this_1.logger.error("SonarQubePredecessorsQuantifier: Prehooks failed for commit " + commit.hash + " with error: " +
                                                (error.message + ". Aborting quantification of commit."), error);
                                            return [2 /*return*/, "continue"];
                                        }
                                        afterPreHooks = (0, moment_1.default)();
                                        beforeSonarQube = (0, moment_1.default)();
                                        return [4 /*yield*/, this_1.sonarQubeQuantify(commit.paths, commit.hash)];
                                    case 5:
                                        measurements = _c.sent();
                                        afterSonarQube = (0, moment_1.default)();
                                        if (measurements.length != commit.localities.length) {
                                            this_1.logger.error("ERROR: SonarQubePredecessorsQuantifier failed for commit " + commit.hash + ".");
                                            return [2 /*return*/, "continue"];
                                        }
                                        commit.localities.forEach(function (locality, x) {
                                            var parsedMeasurement = undefined;
                                            if (measurements[x] != null) {
                                                parsedMeasurement = new sonarQubeMeasurement_1.SonarQubeMeasurement(measurements[x]);
                                            }
                                            quantifications.set(locality, parsedMeasurement);
                                        });
                                        preHooksTime = afterPreHooks.diff(beforePreHooks, "seconds");
                                        checkoutTime = afterCheckout.diff(beforeCheckout, "seconds");
                                        sonarQubeTime = afterSonarQube.diff(beforeSonarQube, "seconds");
                                        totalTime = preHooksTime + checkoutTime + sonarQubeTime;
                                        estimatedTimeS = totalTime * (commits.length - i);
                                        estimatedTimeM = Math.round((estimatedTimeS / 60) * 100) / 100;
                                        estimatedTimeH = Math.round((estimatedTimeS / (60 * 60)) * 100) / 100;
                                        estimatedTimeD = Math.round((estimatedTimeS / (60 * 60 * 24)) * 100) / 100;
                                        this_1.logger.info("\tPrehooks time:\t", preHooksTime);
                                        this_1.logger.info("\tCheckout time:\t", checkoutTime);
                                        this_1.logger.info("\tSonarQube time:\t", sonarQubeTime);
                                        this_1.logger.info("\tTotal time:\t", totalTime);
                                        this_1.logger.info("\tEstimated time for next " + (commits.length - i) + " commits: with " +
                                            totalTime + "s time per commit: " + estimatedTimeS + "s = " + estimatedTimeM + "m = " +
                                            estimatedTimeH + "h  = " + estimatedTimeD + "d");
                                        this_1.logger.info("\n\n\n");
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < commits.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_2(i)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, quantifications];
                }
            });
        });
    };
    SonarQubeQuantifier.prototype.runPreHooks = function () {
        var _this = this;
        if (this.sonarQubeConfig.preHooks) {
            this.sonarQubeConfig.preHooks.forEach(function (hook, index) {
                try {
                    hook();
                }
                catch (error) {
                    _this.logger.error("Error: Failed hook number " + index + ". Error was: " + error.message, error);
                }
            });
        }
    };
    SonarQubeQuantifier.prototype.checkoutCommit = function (hash) {
        return __awaiter(this, void 0, void 0, function () {
            var err_2, err2_1, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 7]);
                        return [4 /*yield*/, this.git.checkout(hash, true)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 2:
                        err_2 = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        // retry
                        return [4 /*yield*/, this.git.checkout(hash, true)];
                    case 4:
                        // retry
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err2_1 = _a.sent();
                        msg = "SonarQubePredecessorsQuantifier: git checkout retry failed with msg: " + err2_1 + "." +
                            (" Aborting quantification for commit " + hash);
                        throw new Error(msg);
                    case 6: return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SonarQubeQuantifier.prototype.sonarQubeQuantify = function (paths, commitHash) {
        return __awaiter(this, void 0, void 0, function () {
            var runSonarScanner, webServerIsUpdated, retrieveMeasurements, waitUntilWebserverIsUpdated, timeBeforeScanning, beforeScanning, afterScanning, error_1, beforeRetrieving, measurements, paths_1, paths_1_1, path, measurement, error_2, e_2_1, afterRetrieving;
            var e_2, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        runSonarScanner = function () {
                            // @formatter:off
                            var args = "-Dproject.settings=" + _this.sonarQubeConfig.propertiesPath;
                            var command = "sonar-scanner.bat " + args;
                            _this.logger.info(command);
                            _this.logger.info("\n\n");
                            _this.logger.info("\tScanning might take a few minutes: Command: ", command);
                            (0, child_process_1.execSync)(command).toString();
                            _this.logger.info("\tFinished scan");
                            //@formatter:on
                        };
                        webServerIsUpdated = function (time) { return __awaiter(_this, void 0, void 0, function () {
                            var config, response, tasks, newestTask, newestTaskTime, error_3;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        config = {
                                            baseURL: this.sonarQubeConfig.sonarQubeURL,
                                            url: "api/ce/activity",
                                            // using base64 auth
                                            auth: {
                                                username: this.sonarQubeConfig.id,
                                                password: this.sonarQubeConfig.pw,
                                            }
                                        };
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, axios(config)];
                                    case 2:
                                        response = _b.sent();
                                        tasks = (_a = response.data) === null || _a === void 0 ? void 0 : _a.tasks;
                                        if (tasks.length <= 0) {
                                            return [2 /*return*/, false];
                                        }
                                        newestTask = tasks[0];
                                        newestTaskTime = Date.parse(newestTask.startedAt);
                                        return [2 /*return*/, newestTask.status == "SUCCESS" && newestTaskTime >= time];
                                    case 3:
                                        error_3 = _b.sent();
                                        this.logger.warn("\tHttp GET to SonarQube-WebApi with path: \"api/ce/activity\" failed with error: \n                    " + error_3.statusCode + ". Error message: " + error_3.message + ". CommitHash: " + commitHash);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        retrieveMeasurements = function (path) { return __awaiter(_this, void 0, void 0, function () {
                            var properties, sonarProjectKey, metricsUrlString, webPath, config, response, error_4, msg;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (path == null)
                                            return [2 /*return*/, null];
                                        properties = propertiesReader(this.sonarQubeConfig.propertiesPath);
                                        sonarProjectKey = properties.get("sonar.projectKey");
                                        metricsUrlString = sonarQubeMetrics_1.SONARQUBE_METRICS.join("%2C");
                                        webPath = path.split("/").join("%2F");
                                        config = {
                                            baseURL: this.sonarQubeConfig.sonarQubeURL,
                                            //url: "/api/measures/component?component=" + sonarProjectKey + "&metricKeys=" +
                                            //    metricsUrlString,
                                            url: "/api/measures/component?component=" + sonarProjectKey + "%3A" + webPath + "&metricKeys=" +
                                                metricsUrlString,
                                            // using base64 auth
                                            auth: {
                                                username: this.sonarQubeConfig.id,
                                                password: this.sonarQubeConfig.pw,
                                            }
                                        };
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, axios(config)];
                                    case 2:
                                        response = _a.sent();
                                        this.logger.info("\tSuccessfully retrieved measurements for path: " + webPath);
                                        return [2 /*return*/, response.data];
                                    case 3:
                                        error_4 = _a.sent();
                                        msg = "\"\tFailed to retrieve measurements from sonarQubeServer for path " + webPath + "." +
                                            ("Error message: " + error_4.message);
                                        throw new Error(msg);
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        waitUntilWebserverIsUpdated = function (timeBeforeScanning) { return __awaiter(_this, void 0, void 0, function () {
                            var now, minutesWaiting;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, webServerIsUpdated(timeBeforeScanning)];
                                    case 1:
                                        if (!!(_a.sent())) return [3 /*break*/, 3];
                                        now = Date.now().valueOf();
                                        minutesWaiting = (now - timeBeforeScanning.valueOf()) / (1000 * 60);
                                        if (minutesWaiting > 15)
                                            throw new Error("Timeout: SonarQube-Webserver has not updated for 15 minutes. Commit " + commitHash);
                                        // sleep 1000ms
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                                    case 2:
                                        // sleep 1000ms
                                        _a.sent();
                                        return [3 /*break*/, 0];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); };
                        timeBeforeScanning = Date.now();
                        beforeScanning = (0, moment_1.default)();
                        runSonarScanner();
                        afterScanning = (0, moment_1.default)();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, waitUntilWebserverIsUpdated(timeBeforeScanning)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        this.logger.error(error_1);
                        return [2 /*return*/, null];
                    case 4:
                        beforeRetrieving = (0, moment_1.default)();
                        measurements = [];
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 12, 13, 14]);
                        paths_1 = __values(paths), paths_1_1 = paths_1.next();
                        _b.label = 6;
                    case 6:
                        if (!!paths_1_1.done) return [3 /*break*/, 11];
                        path = paths_1_1.value;
                        _b.label = 7;
                    case 7:
                        _b.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, retrieveMeasurements(path)];
                    case 8:
                        measurement = _b.sent();
                        measurements.push(measurement);
                        return [3 /*break*/, 10];
                    case 9:
                        error_2 = _b.sent();
                        this.logger.error("Error: Retrieving of measurements for commit: ", commitHash, " for path: ", path, "\n\tMessage: ", error_2.message);
                        return [3 /*break*/, 10];
                    case 10:
                        paths_1_1 = paths_1.next();
                        return [3 /*break*/, 6];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 14:
                        afterRetrieving = (0, moment_1.default)();
                        this.logger.info("\tScanning time: ", afterScanning.diff(beforeScanning, "seconds"));
                        this.logger.info("\tRetrieving time: ", afterRetrieving.diff(beforeRetrieving, "seconds"));
                        return [2 /*return*/, measurements];
                }
            });
        });
    };
    __decorate([
        (0, inversify_1.optional)(),
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES.logger),
        __metadata("design:type", Object)
    ], SonarQubeQuantifier.prototype, "logger", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES.sonarQubeConfig),
        __metadata("design:type", Object)
    ], SonarQubeQuantifier.prototype, "sonarQubeConfig", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBE_TYPES.git),
        __metadata("design:type", Object)
    ], SonarQubeQuantifier.prototype, "git", void 0);
    SonarQubeQuantifier = __decorate([
        (0, inversify_1.injectable)()
    ], SonarQubeQuantifier);
    return SonarQubeQuantifier;
}());
exports.SonarQubeQuantifier = SonarQubeQuantifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29uYXJRdWJlUXVhbnRpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zb25hclF1YmVRdWFudGlmaWVyL3NvbmFyUXViZVF1YW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUQ7QUFDdkQsK0NBQXVDO0FBRXZDLHVEQUFxRDtBQUVyRCw4REFBOEQ7QUFDOUQsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLDhEQUE4RDtBQUM5RCxJQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3RELDJEQUE0RDtBQUU1RCxrQ0FBeUU7QUFFekUsK0RBQTREO0FBQzVELGtEQUE0QjtBQUc1QixtREFBbUQ7QUFHbkQ7SUFBQTtJQW9RQSxDQUFDO0lBMVBTLHNDQUFRLEdBQWQsVUFBZSxVQUF3Qjs7Ozs7Ozt3QkFDbkM7Ozs7OzJCQUtHO3dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUE7d0JBQzdDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQzt3QkFDckMsT0FBTyxHQUFrRSxFQUFFLENBQUE7NENBRXBFLFFBQVE7NEJBQ2YsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztrREFBVzs0QkFDckQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFFcEMsSUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUc7Z0NBQ3JDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUE7NEJBQ25ELENBQUMsQ0FBQyxDQUFBOzRCQUVGLElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQSxVQUFVOztnQ0FDcEMsT0FBTyxNQUFBLFVBQVUsQ0FBQyxJQUFJLDBDQUFFLElBQUksQ0FBQTs0QkFDaEMsQ0FBQyxDQUFDLENBQUE7NEJBRUYsT0FBTyxDQUFDLElBQUksQ0FBQztnQ0FDVCxJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJO2dDQUMxQixVQUFVLEVBQUUsV0FBVztnQ0FDdkIsS0FBSyxFQUFFLEtBQUs7NkJBQ2YsQ0FBQyxDQUFDOzs7NEJBaEJQLEtBQXVCLGVBQUEsU0FBQSxVQUFVLENBQUE7Z0NBQXRCLFFBQVE7d0NBQVIsUUFBUTs2QkFpQmxCOzs7Ozs7Ozs7d0JBRUssZUFBZSxHQUFHLElBQUksaUNBQVcsRUFBb0MsQ0FBQzt3QkFDNUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBOzRDQUcxQyxDQUFDOzs7Ozt3Q0FDQSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUMxQixPQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXNCLENBQUMsR0FBRyxDQUFDLGFBQU8sT0FBTyxDQUFDLE1BQU0sZ0JBQVcsTUFBTSxDQUFDLElBQU0sQ0FBQyxDQUFDO3dDQUUzRixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFBRTs0Q0FDMUQsT0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLCtFQUErRSxFQUM1Rix1REFBdUQsQ0FBQyxDQUFBOzt5Q0FFL0Q7d0NBRUssY0FBYyxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDOzs7O3dDQUU1QixxQkFBTSxPQUFLLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dDQUF0QyxTQUFzQyxDQUFDOzs7O3dDQUV2QyxPQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBOzs7d0NBRzVCLGFBQWEsR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQzt3Q0FFekIsY0FBYyxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO3dDQUNoQyxJQUFJOzRDQUNBLE9BQUssV0FBVyxFQUFFLENBQUM7eUNBQ3RCO3dDQUFDLE9BQU8sS0FBSyxFQUFFOzRDQUNaLE9BQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxxREFBbUQsTUFBTSxDQUFDLElBQUksa0JBQWU7aURBQ3hGLEtBQUssQ0FBQyxPQUFPLHlDQUFzQyxDQUFBLEVBQUUsS0FBSyxDQUFDLENBQUE7O3lDQUVyRTt3Q0FDSyxhQUFhLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7d0NBRXpCLGVBQWUsR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQzt3Q0FDWixxQkFBTSxPQUFLLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFBOzt3Q0FBdEUsWUFBWSxHQUFHLFNBQXVEO3dDQUN0RSxjQUFjLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7d0NBRWhDLElBQUksWUFBWSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTs0Q0FDakQsT0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLGtEQUFnRCxNQUFNLENBQUMsSUFBSSxNQUFHLENBQUMsQ0FBQzs7eUNBRXJGO3dDQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUSxFQUFFLENBQUM7NENBQ2xDLElBQUksaUJBQWlCLEdBQUcsU0FBUyxDQUFDOzRDQUNsQyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0RBQ3pCLGlCQUFpQixHQUFHLElBQUksMkNBQW9CLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7NkNBQ2hFOzRDQUNELGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQUM7d0NBQ3JELENBQUMsQ0FBQyxDQUFBO3dDQUdJLFlBQVksR0FBSSxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQTt3Q0FDN0QsWUFBWSxHQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFBO3dDQUM3RCxhQUFhLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDLENBQUE7d0NBQy9ELFNBQVMsR0FBTyxZQUFZLEdBQUcsWUFBWSxHQUFHLGFBQWEsQ0FBQTt3Q0FDM0QsY0FBYyxHQUFHLFNBQVMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7d0NBQ2hELGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxHQUFDLEVBQUUsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxHQUFDLEdBQUcsQ0FBQzt3Q0FDekQsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLEdBQUMsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsR0FBQyxHQUFHLENBQUM7d0NBQzlELGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxHQUFDLENBQUMsRUFBRSxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxHQUFDLEdBQUcsQ0FBQzt3Q0FDdkUsT0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFLLFlBQVksQ0FBQyxDQUFDO3dDQUN4RCxPQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUssWUFBWSxDQUFDLENBQUM7d0NBQ3hELE9BQUssTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBSSxhQUFhLENBQUMsQ0FBQzt3Q0FDekQsT0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFRLFNBQVMsQ0FBQyxDQUFDO3dDQUNyRCxPQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxHQUFHLGlCQUFpQjs0Q0FDbEYsU0FBUyxHQUFHLHFCQUFxQixHQUFJLGNBQWMsR0FBRyxNQUFNLEdBQUcsY0FBYyxHQUFHLE1BQU07NENBQ3RGLGNBQWMsR0FBRyxPQUFPLEdBQUcsY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3dDQUNyRCxPQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7Ozs7Ozt3QkE5RHJCLENBQUMsR0FBRyxDQUFDOzs7NkJBQUUsQ0FBQSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQTtzREFBekIsQ0FBQzs7Ozs7d0JBQTBCLENBQUMsRUFBRSxDQUFBOzs0QkFtRXZDLHNCQUFPLGVBQWUsRUFBQzs7OztLQUMxQjtJQUVPLHlDQUFXLEdBQW5CO1FBQUEsaUJBVUM7UUFURyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQWdCLEVBQUUsS0FBSztnQkFDMUQsSUFBSTtvQkFDQSxJQUFJLEVBQUUsQ0FBQztpQkFDVjtnQkFBQSxPQUFNLEtBQUssRUFBQztvQkFDVCxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywrQkFBNkIsS0FBSyxxQkFBZ0IsS0FBSyxDQUFDLE9BQVMsRUFBRSxLQUFLLENBQUMsQ0FBQTtpQkFDOUY7WUFDTCxDQUFDLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQUVhLDRDQUFjLEdBQTVCLFVBQTZCLElBQVk7Ozs7Ozs7d0JBR2pDLHFCQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBQTs7d0JBQW5DLFNBQW1DLENBQUM7Ozs7Ozs7d0JBR2hDLFFBQVE7d0JBQ1IscUJBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFBOzt3QkFEbkMsUUFBUTt3QkFDUixTQUFtQyxDQUFDOzs7O3dCQUU5QixHQUFHLEdBQUcsOERBQTRELE1BQUksTUFBRzs2QkFDM0UseUNBQXVDLElBQU0sQ0FBQSxDQUFBO3dCQUNqRCxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7S0FHaEM7SUFFYSwrQ0FBaUIsR0FBL0IsVUFBZ0MsS0FBZSxFQUFFLFVBQWtCOzs7Ozs7Ozt3QkFDekQsZUFBZSxHQUFHOzRCQUNwQixpQkFBaUI7NEJBQ2pCLElBQU0sSUFBSSxHQUFRLHdCQUFzQixLQUFJLENBQUMsZUFBZSxDQUFDLGNBQWdCLENBQUM7NEJBQzlFLElBQU0sT0FBTyxHQUFLLHVCQUFxQixJQUFNLENBQUE7NEJBQzdDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBOzRCQUN6QixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTs0QkFDeEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0RBQWdELEVBQUUsT0FBTyxDQUFDLENBQUM7NEJBQzVFLElBQUEsd0JBQVEsRUFBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDN0IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs0QkFDcEMsZUFBZTt3QkFDbkIsQ0FBQyxDQUFDO3dCQUVJLGtCQUFrQixHQUF1QyxVQUFPLElBQVk7Ozs7Ozt3Q0FFeEUsTUFBTSxHQUF1Qjs0Q0FDL0IsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWTs0Q0FDMUMsR0FBRyxFQUFFLGlCQUFpQjs0Q0FDdEIsb0JBQW9COzRDQUNwQixJQUFJLEVBQUU7Z0RBQ0YsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTtnREFDakMsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTs2Q0FDcEM7eUNBQ0osQ0FBQTs7Ozt3Q0FHb0IscUJBQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3Q0FBOUIsUUFBUSxHQUFHLFNBQW1CO3dDQUM5QixLQUFLLEdBQUcsTUFBQSxRQUFRLENBQUMsSUFBSSwwQ0FBRSxLQUFLLENBQUM7d0NBQ25DLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7NENBQ25CLHNCQUFPLEtBQUssRUFBQzt5Q0FDaEI7d0NBRUssVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3Q0FDdEIsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dDQUN4RCxzQkFBTyxVQUFVLENBQUMsTUFBTSxJQUFJLFNBQVMsSUFBSSxjQUFjLElBQUksSUFBSSxFQUFDOzs7d0NBRWhFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRHQUNYLE9BQUssQ0FBQyxVQUFVLHlCQUFvQixPQUFLLENBQUMsT0FBTyxzQkFBaUIsVUFBWSxDQUFDLENBQUM7Ozs7OzZCQUU3RixDQUFDO3dCQUVJLG9CQUFvQixHQUFHLFVBQU8sSUFBWTs7Ozs7d0NBQzVDLElBQUksSUFBSSxJQUFJLElBQUk7NENBQUUsc0JBQU8sSUFBSSxFQUFDO3dDQUV4QixVQUFVLEdBQVUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQzt3Q0FDMUUsZUFBZSxHQUFLLFVBQVUsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt3Q0FDdkQsZ0JBQWdCLEdBQUksb0NBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dDQUNsRCxPQUFPLEdBQWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0NBR2hELE1BQU0sR0FBdUI7NENBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVk7NENBQzFDLGdGQUFnRjs0Q0FDaEYsdUJBQXVCOzRDQUN2QixHQUFHLEVBQUUsb0NBQW9DLEdBQUcsZUFBZSxHQUFHLEtBQUssR0FBRyxPQUFPLEdBQUcsY0FBYztnREFDMUYsZ0JBQWdCOzRDQUNwQixvQkFBb0I7NENBQ3BCLElBQUksRUFBRTtnREFDRixRQUFRLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dEQUNqQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFOzZDQUNwQzt5Q0FDSixDQUFBOzs7O3dDQUdvQixxQkFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dDQUE5QixRQUFRLEdBQUcsU0FBbUI7d0NBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFEQUFtRCxPQUFTLENBQUMsQ0FBQzt3Q0FDL0Usc0JBQU8sUUFBUSxDQUFDLElBQUksRUFBQzs7O3dDQUVmLEdBQUcsR0FBRyx1RUFBb0UsT0FBTyxNQUFHOzZDQUN0RixvQkFBa0IsT0FBSyxDQUFDLE9BQVMsQ0FBQSxDQUFBO3dDQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7OzZCQUU1QixDQUFBO3dCQUVLLDJCQUEyQixHQUFHLFVBQU8sa0JBQWtCOzs7OzRDQUdqRCxxQkFBTSxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFBOzs2Q0FBN0MsQ0FBQyxDQUFBLFNBQTRDLENBQUE7d0NBQzFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUE7d0NBQzFCLGNBQWMsR0FBRyxDQUFDLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFBO3dDQUN6RSxJQUFJLGNBQWMsR0FBRyxFQUFFOzRDQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLHlFQUF1RSxVQUFZLENBQUMsQ0FBQzt3Q0FFekcsZUFBZTt3Q0FDZixxQkFBTSxJQUFJLE9BQU8sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQXpCLENBQXlCLENBQUMsRUFBQTs7d0NBRHZELGVBQWU7d0NBQ2YsU0FBdUQsQ0FBQzs7Ozs7NkJBRS9ELENBQUE7d0JBRUssa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUNoQyxjQUFjLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7d0JBQ2hDLGVBQWUsRUFBRSxDQUFDO3dCQUNaLGFBQWEsR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQzs7Ozt3QkFFM0IscUJBQU0sMkJBQTJCLENBQUMsa0JBQWtCLENBQUMsRUFBQTs7d0JBQXJELFNBQXFELENBQUM7Ozs7d0JBRXRELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQUssQ0FBQyxDQUFDO3dCQUN6QixzQkFBTyxJQUFJLEVBQUM7O3dCQUdWLGdCQUFnQixHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO3dCQUM1QixZQUFZLEdBQUcsRUFBRSxDQUFDOzs7O3dCQUNMLFVBQUEsU0FBQSxLQUFLLENBQUE7Ozs7d0JBQWIsSUFBSTs7Ozt3QkFFYSxxQkFBTSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQTlDLFdBQVcsR0FBRyxTQUFnQzt3QkFDcEQsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozt3QkFFL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELEVBQUUsVUFBVSxFQUMxRSxhQUFhLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxPQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQUczRCxlQUFlLEdBQUcsSUFBQSxnQkFBTSxHQUFFLENBQUM7d0JBRWpDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLGVBQWUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFFM0Ysc0JBQU8sWUFBWSxFQUFDOzs7O0tBQ3ZCO0lBaFFEO1FBREMsSUFBQSxvQkFBUSxHQUFFO1FBQUUsSUFBQSxrQkFBTSxFQUFDLHVEQUErQyxDQUFDLE1BQU0sQ0FBQzs7dURBQzdEO0lBR2Q7UUFEQyxJQUFBLGtCQUFNLEVBQUMsdURBQStDLENBQUMsZUFBZSxDQUFDOztnRUFDdkM7SUFHakM7UUFEQyxJQUFBLGtCQUFNLEVBQUMsdURBQStDLENBQUMsR0FBRyxDQUFDOztvREFDbkQ7SUFSQSxtQkFBbUI7UUFEL0IsSUFBQSxzQkFBVSxHQUFFO09BQ0EsbUJBQW1CLENBb1EvQjtJQUFELDBCQUFDO0NBQUEsQUFwUUQsSUFvUUM7QUFwUVksa0RBQW1CIn0=