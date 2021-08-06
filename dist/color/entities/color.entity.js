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
exports.ColorSchema = exports.Color = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let Color = class Color {
};
__decorate([
    mongoose_1.Prop({ type: String, required: [true, 'nameColor is required'] }),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], Color.prototype, "nameColor", void 0);
Color = __decorate([
    mongoose_1.Schema()
], Color);
exports.Color = Color;
exports.ColorSchema = mongoose_1.SchemaFactory.createForClass(Color);
//# sourceMappingURL=color.entity.js.map