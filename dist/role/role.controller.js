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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../auth/role/role.enum");
const metadata_1 = require("../Decorator/metadata");
const jwt_auth_guard_1 = require("../Guards/jwt-auth-guard");
const roles_guard_1 = require("../Guards/roles-guard");
const roles_decorator_1 = require("../Guards/roles.decorator");
const create_role_dto_1 = require("./dto/create-role.dto");
const id_role_dto_1 = require("./dto/id-role.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const role_entity_1 = require("./entities/role.entity");
const role_service_1 = require("./role.service");
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    createRole(createRoleDto) {
        return this.roleService.createRole(createRoleDto);
    }
    findAllRoles() {
        return this.roleService.findAllRoles();
    }
    findOneRole(idRoleDto) {
        return this.roleService.findOneRole(idRoleDto);
    }
    updateRole(idRoleDto, updateRoleDto) {
        return this.roleService.updateRole(idRoleDto, updateRoleDto);
    }
    deleteRole(idRoleDto) {
        return this.roleService.removeRole(idRoleDto);
    }
};
__decorate([
    common_1.Post(),
    roles_decorator_1.Roles(role_enum_1.ListRole.Admin),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Created successfully role',
        type: role_entity_1.Role,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createRole", null);
__decorate([
    common_1.Get(),
    metadata_1.Public(),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Get all Role',
        type: [role_entity_1.Role],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findAllRoles", null);
__decorate([
    common_1.Get(':id'),
    metadata_1.Public(),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Get detail a Role',
        type: role_entity_1.Role,
    }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_role_dto_1.IdRoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findOneRole", null);
__decorate([
    common_1.Patch(':id'),
    roles_decorator_1.Roles(role_enum_1.ListRole.Admin),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Update a Role by id',
        type: role_entity_1.Role,
    }),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_role_dto_1.IdRoleDto,
        update_role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "updateRole", null);
__decorate([
    common_1.Delete(':id'),
    roles_decorator_1.Roles(role_enum_1.ListRole.Admin),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Delete a Role by id',
        type: String,
    }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_role_dto_1.IdRoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "deleteRole", null);
RoleController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Controller('role'),
    swagger_1.ApiTags('Role'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map