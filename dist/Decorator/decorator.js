"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../user/entities/user.entity");
exports.GetUser = common_1.createParamDecorator((_data, ctx) => {
    const reqBody = ctx.switchToHttp().getRequest();
    return reqBody.user;
});
//# sourceMappingURL=decorator.js.map