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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_not_blank_validator_1 = require("../../custom-validator/is-not-blank.validator");
class CreateUserDto {
}
__decorate([
    is_not_blank_validator_1.IsNotBlank('username', { message: 'username can not empty' }),
    swagger_1.ApiProperty({ type: String }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    is_not_blank_validator_1.IsNotBlank('password', { message: 'password can not empty' }),
    swagger_1.ApiProperty({ type: String }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsEmail(),
    swagger_1.ApiProperty({ type: String }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    is_not_blank_validator_1.IsNotBlank('name', { message: 'name can not empty' }),
    swagger_1.ApiProperty({ type: String }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty({ type: Number }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "yearOfBirth", void 0);
__decorate([
    swagger_1.ApiProperty({ type: String }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsMongoId(),
    swagger_1.ApiProperty({ type: String }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "statusId", void 0);
__decorate([
    class_validator_1.IsMongoId(),
    swagger_1.ApiProperty({ type: String }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "roleId", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map