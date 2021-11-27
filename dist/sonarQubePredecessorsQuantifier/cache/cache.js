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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAMCache = void 0;
var bugfinder_framework_1 = require("bugfinder-framework");
var inversify_1 = require("inversify");
var TYPES_1 = require("../../TYPES");
var RAMCache = /** @class */ (function () {
    function RAMCache() {
    }
    RAMCache.prototype.init = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info("Initializing Cache...");
                        _b = this;
                        return [4 /*yield*/, this.db.readQuantifications(this.cacheID)];
                    case 1:
                        _b.data = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RAMCache.prototype.get = function (locality) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.data.getVal(locality)];
            });
        });
    };
    RAMCache.prototype.set = function (locality, measurement) {
        return __awaiter(this, void 0, void 0, function () {
            var el, tmpMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(locality)];
                    case 1:
                        el = _a.sent();
                        tmpMap = new bugfinder_framework_1.LocalityMap();
                        tmpMap.set(locality, measurement);
                        if (el == null) {
                            //await this.db.writeQuantifications(tmpMap, this.cacheID, WriteMode.append)
                            this.data.set(locality, measurement);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.db),
        __metadata("design:type", Object)
    ], RAMCache.prototype, "db", void 0);
    __decorate([
        (0, inversify_1.inject)(TYPES_1.BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.cacheID),
        __metadata("design:type", String)
    ], RAMCache.prototype, "cacheID", void 0);
    __decorate([
        (0, inversify_1.optional)(),
        (0, inversify_1.inject)(bugfinder_framework_1.SHARED_TYPES.logger),
        __metadata("design:type", Object)
    ], RAMCache.prototype, "logger", void 0);
    RAMCache = __decorate([
        (0, inversify_1.injectable)(),
        __metadata("design:paramtypes", [])
    ], RAMCache);
    return RAMCache;
}());
exports.RAMCache = RAMCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc29uYXJRdWJlUHJlZGVjZXNzb3JzUXVhbnRpZmllci9jYWNoZS9jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyREFBNkU7QUFFN0UsdUNBQXVEO0FBQ3ZELHFDQUF3RjtBQWV4RjtJQVlJO0lBQ0EsQ0FBQztJQUVLLHVCQUFJLEdBQVY7Ozs7Ozs7d0JBQ0ksTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQTt3QkFDMUMsS0FBQSxJQUFJLENBQUE7d0JBQVEscUJBQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUEzRCxHQUFLLElBQUksR0FBRyxTQUErQyxDQUFBOzs7OztLQUM5RDtJQUVLLHNCQUFHLEdBQVQsVUFBVSxRQUFvQjs7O2dCQUMxQixzQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBQTs7O0tBQ3BDO0lBRUssc0JBQUcsR0FBVCxVQUFVLFFBQW9CLEVBQUUsV0FBaUM7Ozs7OzRCQUNsRCxxQkFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBN0IsRUFBRSxHQUFHLFNBQXdCO3dCQUM3QixNQUFNLEdBQUcsSUFBSSxpQ0FBVyxFQUFvQyxDQUFBO3dCQUNsRSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQTt3QkFDakMsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFOzRCQUNaLDRFQUE0RTs0QkFDNUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFBO3lCQUN2Qzs7Ozs7S0FDSjtJQTlCRDtRQURDLElBQUEsa0JBQU0sRUFBQyxtRUFBMkQsQ0FBQyxFQUFFLENBQUM7O3dDQUN6QjtJQUc5QztRQURDLElBQUEsa0JBQU0sRUFBQyxtRUFBMkQsQ0FBQyxPQUFPLENBQUM7OzZDQUM3RDtJQUdmO1FBREMsSUFBQSxvQkFBUSxHQUFFO1FBQUUsSUFBQSxrQkFBTSxFQUFDLGtDQUFZLENBQUMsTUFBTSxDQUFDOzs0Q0FDMUI7SUFSTCxRQUFRO1FBRHBCLElBQUEsc0JBQVUsR0FBRTs7T0FDQSxRQUFRLENBa0NwQjtJQUFELGVBQUM7Q0FBQSxBQWxDRCxJQWtDQztBQWxDWSw0QkFBUSJ9