"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const user_module_1 = require("../user/user.module");
const auth_service_1 = require("./auth.service");
const constants_1 = require("./constants");
const local_strategy_1 = require("./local-strategy");
const jwt_strategy_1 = require("./jwt.strategy");
const jwt_auth_guard_1 = require("../Guards/jwt-auth-guard");
const auth_controller_1 = require("./auth.controller");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '100m' },
            }),
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, jwt_auth_guard_1.JwtAuthGuard],
        exports: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map