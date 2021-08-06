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
exports.ColorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../auth/role/role.enum");
const metadata_1 = require("../Decorator/metadata");
const jwt_auth_guard_1 = require("../Guards/jwt-auth-guard");
const roles_guard_1 = require("../Guards/roles-guard");
const roles_decorator_1 = require("../Guards/roles.decorator");
const color_service_1 = require("./color.service");
const create_color_dto_1 = require("./dto/create-color.dto");
const update_color_dto_1 = require("./dto/update-color.dto");
let ColorController = class ColorController {
    constructor(colorService) {
        this.colorService = colorService;
    }
    create(createColorDto) {
        return this.colorService.create(createColorDto);
    }
    findAll() {
        return this.colorService.findAll();
    }
    findOne(id) {
        return this.colorService.findOne(id);
    }
    update(id, updateColorDto) {
        return this.colorService.update(id, updateColorDto);
    }
    remove(id) {
        return this.colorService.remove(id);
    }
};
__decorate([
    common_1.Post(),
    roles_decorator_1.Roles(role_enum_1.ListRole.Admin),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_color_dto_1.CreateColorDto]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "create", null);
__decorate([
    common_1.Get(),
    metadata_1.Public(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    metadata_1.Public(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    roles_decorator_1.Roles(role_enum_1.ListRole.Admin),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_color_dto_1.UpdateColorDto]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    roles_decorator_1.Roles(role_enum_1.ListRole.Admin),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ColorController.prototype, "remove", null);
ColorController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Controller('color'),
    swagger_1.ApiTags('Color'),
    __metadata("design:paramtypes", [color_service_1.ColorService])
], ColorController);
exports.ColorController = ColorController;
//# sourceMappingURL=color.controller.js.map