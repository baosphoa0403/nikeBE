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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const role_entity_1 = require("./entities/role.entity");
let RoleService = class RoleService {
    constructor(roleModel) {
        this.roleModel = roleModel;
    }
    async createRole(createRoleDto) {
        const roleEntity = new this.roleModel(createRoleDto);
        return await roleEntity.save();
    }
    async findAllRoles() {
        return await this.roleModel.find();
    }
    async findOneRole(idRoleDto) {
        const role = await this.roleModel.findById(idRoleDto.id);
        if (!role)
            throw new common_1.NotFoundException(`Id ${idRoleDto.id} not found`);
        return role;
    }
    async updateRole(idRoleDto, updateRoleDto) {
        const role = await this.roleModel.findById(idRoleDto.id);
        if (!role)
            throw new common_1.NotFoundException(`Id ${idRoleDto.id} not found`);
        role.nameRole = updateRoleDto.nameRole;
        return await role.save();
    }
    async removeRole(idRoleDto) {
        const role = await this.roleModel.findById(idRoleDto.id);
        if (!role)
            throw new common_1.NotFoundException(`Id ${idRoleDto.id} not found`);
        await role.remove();
        return `delete role ${idRoleDto.id} successfull`;
    }
};
RoleService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(role_entity_1.Role.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map