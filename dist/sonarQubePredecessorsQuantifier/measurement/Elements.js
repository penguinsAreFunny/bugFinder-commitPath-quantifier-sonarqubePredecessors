"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredecessorMeasures = void 0;
/**
 * Contains measures of SonarQubeMeasurements beginning with newest measures (higher commit.order)
 * ending with oldest (lower commit.order)
 */
var PredecessorMeasures = /** @class */ (function () {
    function PredecessorMeasures() {
        this.measures = [];
    }
    PredecessorMeasures.prototype.accept = function (visitor, result) {
        visitor.visit(this, result);
    };
    return PredecessorMeasures;
}());
exports.PredecessorMeasures = PredecessorMeasures;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxlbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc29uYXJRdWJlUHJlZGVjZXNzb3JzUXVhbnRpZmllci9tZWFzdXJlbWVudC9FbGVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPQTs7O0dBR0c7QUFDSDtJQUFBO1FBQ0ksYUFBUSxHQUFpQixFQUFFLENBQUE7SUFLL0IsQ0FBQztJQUhHLG9DQUFNLEdBQU4sVUFBTyxPQUFtQixFQUFFLE1BQWtCO1FBQzFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQy9CLENBQUM7SUFDTCwwQkFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTlksa0RBQW1CIn0=