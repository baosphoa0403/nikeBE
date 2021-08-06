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
exports.CreateProductDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateProductDetailDto {
}
__decorate([
    class_validator_1.IsMongoId(),
    swagger_1.ApiProperty({ type: String }),
    __metadata("design:type", String)
], CreateProductDetailDto.prototype, "statusId", void 0);
__decorate([
    class_validator_1.IsMongoId(),
    swagger_1.ApiProperty({ type: String }),
    __metadata("design:type", String)
], CreateProductDetailDto.prototype, "colorId", void 0);
__decorate([
    class_validator_1.IsMongoId(),
    swagger_1.ApiProperty({ type: String }),
    __metadata("design:type", String)
], CreateProductDetailDto.prototype, "genderId", void 0);
__decorate([
    class_validator_1.IsMongoId(),
    swagger_1.ApiProperty({ type: String }),
    __metadata("design:type", String)
], CreateProductDetailDto.prototype, "sizeId", void 0);
__decorate([
    class_validator_1.IsNumber(),
    swagger_1.ApiProperty({ type: Number }),
    __metadata("design:type", Number)
], CreateProductDetailDto.prototype, "price", void 0);
__decorate([
    class_validator_1.IsNumber(),
    swagger_1.ApiProperty({ type: Number }),
    __metadata("design:type", Number)
], CreateProductDetailDto.prototype, "quantity", void 0);
exports.CreateProductDetailDto = CreateProductDetailDto;
//# sourceMappingURL=create-product-detail.dto.js.map