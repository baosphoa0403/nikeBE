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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusSchema = exports.Status = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const product_entity_1 = require("../../product/entities/product.entity");
let Status = class Status {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Status.prototype, "nameStatus", void 0);
__decorate([
    mongoose_1.Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] }),
    __metadata("design:type", Array)
], Status.prototype, "listProduct", void 0);
Status = __decorate([
    mongoose_1.Schema()
], Status);
exports.Status = Status;
exports.StatusSchema = mongoose_1.SchemaFactory.createForClass(Status);
//# sourceMappingURL=status.entity.js.map