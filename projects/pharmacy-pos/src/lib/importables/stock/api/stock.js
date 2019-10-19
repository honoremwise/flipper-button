"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stock = /** @class */ (function () {
    function Stock(params) {
        if (params === void 0) { params = {}; }
        this.customer_type_items = [];
        for (var name_1 in params) {
            this[name_1] = params[name_1];
        }
    }
    return Stock;
}());
exports.Stock = Stock;
var StockMovements = /** @class */ (function () {
    function StockMovements(params) {
        if (params === void 0) { params = {}; }
        this.item = {};
        for (var name_2 in params) {
            this[name_2] = params[name_2];
        }
    }
    return StockMovements;
}());
exports.StockMovements = StockMovements;
//# sourceMappingURL=stock.js.map