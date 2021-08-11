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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_entity_1 = require("./entities/user.entity");
const id_user_dto_1 = require("./dto/id-user.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../Guards/jwt-auth-guard");
const roles_guard_1 = require("../Guards/roles-guard");
const roles_decorator_1 = require("../Guards/roles.decorator");
const role_enum_1 = require("../auth/role/role.enum");
const metadata_1 = require("../Decorator/metadata");
const decorator_1 = require("../Decorator/decorator");
const payload_1 = require("../auth/role/payload");
const create_userProfile_dto_1 = require("./dto/create-userProfile.dto");
const update_user_profile_dto_1 = require("./dto/update-user-profile.dto");
const update_password_1 = require("./dto/update-password");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(createUserDto) {
        return this.userService.createUser(createUserDto);
    }
    createUser(createUserProfileDto) {
        return this.userService.createUserProfile(createUserProfileDto);
    }
    findAll() {
        return this.userService.findAllUser();
    }
    findOne(payload) {
        return this.userService.findOneUser({ id: payload.userId });
    }
    update(payload, updateUserDto) {
        return this.userService.updateUser({ id: payload.userId }, updateUserDto);
    }
    updateProfileUser(payload, updateUserProfileDto) {
        return this.userService.updateUserProfile({ id: payload.userId }, updateUserProfileDto);
    }
    updatePassword(payload, password) {
        return this.userService.updatePassword(password, { id: payload.userId });
    }
    remove(idUserDto) {
        return this.userService.removeUser(idUserDto);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Create a User by admin',
        type: user_entity_1.User,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    metadata_1.Public(),
    common_1.Post("/createUserProfile"),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Create a User by user',
        type: user_entity_1.User,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_userProfile_dto_1.CreateUserProfileDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
__decorate([
    common_1.Get(),
    roles_decorator_1.Roles(role_enum_1.ListRole.Admin),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Get all User',
        type: [user_entity_1.User],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    common_1.Get('/detail'),
    roles_decorator_1.Roles(role_enum_1.ListRole.Admin, role_enum_1.ListRole.User),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Get a User by id',
        type: user_entity_1.User,
    }),
    __param(0, decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payload_1.Payload]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    common_1.Patch('/update'),
    roles_decorator_1.Roles(role_enum_1.ListRole.Admin),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Update a User by id role admin',
        type: user_entity_1.User,
    }),
    __param(0, decorator_1.GetUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payload_1.Payload,
        update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    common_1.Patch('/updateProfileUser'),
    roles_decorator_1.Roles(role_enum_1.ListRole.User),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Update a User by id role user',
        type: user_entity_1.User,
    }),
    __param(0, decorator_1.GetUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payload_1.Payload,
        update_user_profile_dto_1.UpdateUserProfileDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfileUser", null);
__decorate([
    common_1.Patch("/updatePassword"),
    roles_decorator_1.Roles(role_enum_1.ListRole.User),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Update password by user',
        type: String,
    }),
    __param(0, decorator_1.GetUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payload_1.Payload, update_password_1.UpdatePassword]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updatePassword", null);
__decorate([
    common_1.Delete(':id'),
    roles_decorator_1.Roles(role_enum_1.ListRole.Admin),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Delete a User by id',
        type: String,
    }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_user_dto_1.IdUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
UserController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('user'),
    swagger_1.ApiTags('User'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map