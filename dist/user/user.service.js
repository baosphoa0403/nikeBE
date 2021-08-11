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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const id_role_dto_1 = require("../role/dto/id-role.dto");
const role_entity_1 = require("../role/entities/role.entity");
const status_entity_1 = require("../status/entities/status.entity");
const user_entity_1 = require("./entities/user.entity");
const status_enum_1 = require("../common/status.enum");
const common_2 = require("@nestjs/common");
let UserService = class UserService {
    constructor(userModel, roleModel, StatusModel) {
        this.userModel = userModel;
        this.roleModel = roleModel;
        this.StatusModel = StatusModel;
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
    async findStatusWithName(name) {
        return await this.StatusModel.findOne({
            nameStatus: name,
        }).catch(() => {
            throw new common_1.BadRequestException('something wrong');
        });
    }
    async createUser(createUserDto) {
        const salt = await bcrypt.genSalt();
        const password = await this.hashPassword(createUserDto.password, salt);
        const { username, email, name, yearOfBirth, address, statusId, roleId } = createUserDto;
        const user = new this.userModel({
            username,
            password,
            email,
            name,
            yearOfBirth,
            address,
            status: statusId,
            role: roleId,
        });
        const userSave = await user.save().catch((err) => {
            throw new common_1.BadRequestException('Username or email is existed');
        });
        return this.userModel
            .findById(userSave._id, { password: 0 })
            .populate('role')
            .populate('status');
    }
    async createUserProfile(createUserDto) {
        const salt = await bcrypt.genSalt();
        const password = await this.hashPassword(createUserDto.password, salt);
        const statusActive = await this.StatusModel.findOne({ nameStatus: "active" });
        const roleUser = await this.roleModel.findOne({ nameRole: "User" });
        const { username, email, name, yearOfBirth, address } = createUserDto;
        const user = new this.userModel({
            username,
            password,
            email,
            name,
            yearOfBirth,
            address,
            status: statusActive._id,
            role: roleUser._id,
        });
        const userSave = await user.save().catch((err) => {
            throw new common_1.BadRequestException('Username or email is existed');
        });
        return this.userModel
            .findById(userSave._id, { password: 0 })
            .populate('role')
            .populate('status');
    }
    async updatePassword({ password }, idUserDto) {
        const salt = await bcrypt.genSalt();
        const hashpassword = await this.hashPassword(password, salt);
        await this.userModel.findByIdAndUpdate(idUserDto.id, { password: hashpassword });
        return {
            message: "update password successfully",
            statusCode: common_2.HttpStatus.PERMANENT_REDIRECT
        };
    }
    async findAllUser() {
        const activeStatus = await this.findStatusWithName(status_enum_1.StatusEnum.Active);
        return await this.userModel
            .find({ status: activeStatus }, { password: 0 })
            .populate('role')
            .populate('status')
            .catch(() => {
            throw new common_1.BadRequestException('some thing wrong');
        });
    }
    async findOneUser(idUserDto) {
        const activeStatus = await this.findStatusWithName(status_enum_1.StatusEnum.Active);
        const user = await this.userModel
            .findOne({ _id: idUserDto.id, status: activeStatus }, { password: 0 })
            .populate('role')
            .populate('status');
        if (!user)
            throw new common_1.NotFoundException(`id ${idUserDto.id} not found`);
        return user;
    }
    async findUserByEmail(email) {
        return await this.userModel.findOne({ email: email }).populate('role');
    }
    async updateUser(idUserDto, updateUserDto) {
        const user = await this.userModel.findById(idUserDto.id).populate('role');
        const role = await this.roleModel.findById(updateUserDto.roleId);
        const status = await this.StatusModel.findById(updateUserDto.statusId);
        if (!user)
            throw new common_1.NotFoundException(`id user: ${idUserDto.id} not found`);
        if (!role)
            throw new common_1.NotFoundException(`id role: ${updateUserDto.roleId} not found`);
        if (!status)
            throw new common_1.NotFoundException(`id status: ${updateUserDto.statusId} not found`);
        const salt = await bcrypt.genSalt();
        const hashpassword = this.hashPassword(updateUserDto.password, salt);
        const { name, email, yearOfBirth, address } = updateUserDto;
        const updatedUser = await this.userModel
            .findByIdAndUpdate(idUserDto.id, { name, email, hashpassword, yearOfBirth, address, status, role }, { new: true, runValidators: true })
            .populate('role')
            .populate('status');
        return updatedUser;
    }
    async updateUserProfile(idUserDto, updateUserProfileDto) {
        const user = await this.userModel.findById(idUserDto.id).populate('role');
        if (!user)
            throw new common_1.NotFoundException(`id user: ${idUserDto.id} not found`);
        const { name, email, yearOfBirth, address, username } = updateUserProfileDto;
        const updatedUser = await this.userModel
            .findByIdAndUpdate(idUserDto.id, { name, email, username, yearOfBirth, address }, { new: true, runValidators: true })
            .populate('role')
            .populate('status');
        return updatedUser;
    }
    async removeUser(idUserDto) {
        const user = await this.findOneUser(idUserDto);
        if (!user)
            throw new common_1.NotFoundException(`id user: ${idUserDto.id} not found`);
        const inActiveStatus = await this.findStatusWithName(status_enum_1.StatusEnum.Inactive);
        await this.userModel
            .findByIdAndUpdate(idUserDto.id, {
            status: inActiveStatus,
        }, { new: true, runValidators: true })
            .catch(() => {
            throw new common_1.BadRequestException('some thing wrong');
        });
        return `delete user ${idUserDto.id} successfull`;
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_entity_1.User.name)),
    __param(1, mongoose_1.InjectModel(role_entity_1.Role.name)),
    __param(2, mongoose_1.InjectModel(status_entity_1.Status.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map