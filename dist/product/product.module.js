"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const mongoose_1 = require("@nestjs/mongoose");
const product_entity_1 = require("./entities/product.entity");
const status_module_1 = require("../status/status.module");
const category_entity_1 = require("../category/entities/category.entity");
const status_entity_1 = require("../status/entities/status.entity");
const color_entity_1 = require("../color/entities/color.entity");
const gender_entity_1 = require("../gender/entities/gender.entity");
const product_detail_entity_1 = require("./entities/product-detail.entity");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: product_entity_1.Product.name, schema: product_entity_1.ProductSchema },
                { name: product_detail_entity_1.ProductDetail.name, schema: product_detail_entity_1.ProductDetailSchema },
                { name: category_entity_1.Category.name, schema: category_entity_1.CategorySchema },
                { name: status_entity_1.Status.name, schema: status_entity_1.StatusSchema },
                { name: color_entity_1.Color.name, schema: color_entity_1.ColorSchema },
                { name: gender_entity_1.Gender.name, schema: gender_entity_1.GenderSchema },
            ]),
            common_1.forwardRef(() => status_module_1.StatusModule),
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService],
        exports: [product_service_1.ProductService],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map