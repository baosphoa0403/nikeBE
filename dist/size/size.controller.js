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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeController = void 0;
const common_1 = require("@nestjs/common");
const size_service_1 = require("./size.service");
const create_size_dto_1 = require("./dto/create-size.dto");
const update_size_dto_1 = require("./dto/update-size.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../Guards/jwt-auth-guard");
const roles_guard_1 = require("../Guards/roles-guard");
const roles_decorator_1 = require("../Guards/roles.decorator");
const role_enum_1 = require("../auth/role/role.enum");
const metadata_1 = require("../Decorator/metadata");
let SizeController = class SizeController {
    constructor(sizeService) {
        this.sizeService = sizeService;
    }
    create(createSizeDto) {
        return this.sizeService.create(createSizeDto);
    }
    findAll() {
        return this.sizeService.findAll();
    }
    findOne(id) {
        return this.sizeService.findOne(id);
    }
    update(id, updateSizeDto) {
        return this.sizeService.update(id, updateSizeDto);
    }
    remove(id) {
        return this.sizeService.remove(id);
    }
};
__decorate([
    common_1.Post(),
    roles_decorator_1.Roles(role_enum_1.ListRole.Admin),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_size_dto_1.CreateSizeDto]),
    __metadata("design:returntype", Promise)
], SizeController.prototype, "create", null);
__decorate([
    common_1.Get(),
    metadata_1.Public(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SizeController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    metadata_1.Public(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SizeController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    roles_decorator_1.Roles(role_enum_1.ListRole.Admin),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_size_dto_1.UpdateSizeDto]),
    __metadata("design:returntype", Promise)
], SizeController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    roles_decorator_1.Roles(role_enum_1.ListRole.Admin),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SizeController.prototype, "remove", null);
SizeController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Controller('size'),
    swagger_1.ApiTags('Size'),
    __metadata("design:paramtypes", [size_service_1.SizeService])
], SizeController);
exports.SizeController = SizeController;
//# sourceMappingURL=size.controller.js.map