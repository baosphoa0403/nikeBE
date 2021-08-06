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
exports.GoogleService = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const user_entity_1 = require("../user/entities/user.entity");
const user_service_1 = require("../user/user.service");
let GoogleService = class GoogleService {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async googleLogin(req) {
        if (!req.user) {
            throw new common_1.BadRequestException();
        }
        const user = await this.userService.findUserByEmail(req.user.email);
        if (user == null) {
            return {
                data: req.user,
                statusCode: common_1.HttpStatus.PERMANENT_REDIRECT,
            };
        }
        return this.authService.login(user);
    }
};
GoogleService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], GoogleService);
exports.GoogleService = GoogleService;
//# sourceMappingURL=google.service.js.map