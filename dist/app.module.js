"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const product_module_1 = require("./product/product.module");
const status_module_1 = require("./status/status.module");
const gender_module_1 = require("./gender/gender.module");
const size_module_1 = require("./size/size.module");
const color_module_1 = require("./color/color.module");
const category_module_1 = require("./category/category.module");
const role_module_1 = require("./role/role.module");
const user_module_1 = require("./user/user.module");
const google_module_1 = require("./google/google.module");
const auth_module_1 = require("./auth/auth.module");
const facebook_module_1 = require("./facebook/facebook.module");
const code_module_1 = require("./code/code.module");
const code_detail_module_1 = require("./code-detail/code-detail.module");
const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            product_module_1.ProductModule,
            mongoose_1.MongooseModule.forRoot(process.env.DATABASE_URL),
            status_module_1.StatusModule,
            gender_module_1.GenderModule,
            size_module_1.SizeModule,
            color_module_1.ColorModule,
            category_module_1.CategoryModule,
            role_module_1.RoleModule,
            user_module_1.UserModule,
            google_module_1.GoogleModule,
            auth_module_1.AuthModule,
            facebook_module_1.FacebookModule,
            code_module_1.CodeModule,
            code_detail_module_1.CodeDetailModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map