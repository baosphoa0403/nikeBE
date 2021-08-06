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
exports.FacebookStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_facebook_1 = require("passport-facebook");
const auth_service_1 = require("../auth/auth.service");
const facebook_service_1 = require("./facebook.service");
let FacebookStrategy = class FacebookStrategy extends passport_1.PassportStrategy(passport_facebook_1.Strategy, 'facebook') {
    constructor(facebookService) {
        super({
            clientID: process.env.APP_ID,
            clientSecret: process.env.APP_SECRET,
            callbackURL: 'http://localhost:3000/facebook/redirect',
            scope: 'email',
            profileFields: ['emails', 'name'],
        });
        this.facebookService = facebookService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        const { name, emails } = profile;
        const user = {
            email: emails[0].value,
            name: name.givenName,
            username: name.familyName + ' ' + name.givenName,
            accessToken,
        };
        done(null, user);
    }
};
FacebookStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [facebook_service_1.FacebookService])
], FacebookStrategy);
exports.FacebookStrategy = FacebookStrategy;
//# sourceMappingURL=facebook-strategy.js.map