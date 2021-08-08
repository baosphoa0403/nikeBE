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
exports.GoogleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const google_service_1 = require("./google.service");
let GoogleController = class GoogleController {
    constructor(googleService) {
        this.googleService = googleService;
    }
    checkTotkenId(tokenId) {
        return this.googleService.googleLogin(tokenId);
    }
};
__decorate([
    common_1.Get(':tokenId'),
    swagger_1.ApiResponse({
        status: 200,
        description: 'login with google by send tokenId',
    }),
    __param(0, common_1.Param('tokenId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GoogleController.prototype, "checkTotkenId", null);
GoogleController = __decorate([
    swagger_1.ApiTags('Google'),
    common_1.Controller('google'),
    __metadata("design:paramtypes", [google_service_1.GoogleService])
], GoogleController);
exports.GoogleController = GoogleController;
//# sourceMappingURL=google.controller.js.map