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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const product_entity_1 = require("./entities/product.entity");
const swagger_1 = require("@nestjs/swagger");
const id_product_dto_1 = require("./dto/id-product.dto");
const product_detail_entity_1 = require("./entities/product-detail.entity");
const update_product_detail_dto_1 = require("./dto/update-product-detail.dto");
const id_product_detail_dto_1 = require("./dto/id-product-detail.dto");
const product_filter_dto_1 = require("./dto/product-filter.dto");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    filter(filter) {
        return this.productService.findWithFilter(filter);
    }
    createProduct(createProductDto) {
        return this.productService.createProduct(createProductDto);
    }
    insertProductDetail(idProductDto, updateProductDetailDto) {
        return this.productService.insertDetail(idProductDto.id, updateProductDetailDto);
    }
    getAllProduct() {
        return this.productService.getAllProduct();
    }
    getAllProductDetail(idProductDto) {
        return this.productService.getAllProductDetail(idProductDto.id);
    }
    getProduct(idProductDto) {
        return this.productService.findOne(idProductDto.id);
    }
    updateProduct(idProoductDto, updateProductDto) {
        return this.productService.updateProduct(idProoductDto.id, updateProductDto);
    }
    updateProductDetail(idProductDetailDto, updateProductDetailDto) {
        return this.productService.updateProductDetail(idProductDetailDto.id, updateProductDetailDto);
    }
    deleteProduct(idProductDto) {
        return this.productService.deleteProduct(idProductDto.id);
    }
    deleteProductDetail(idProductDetailDto) {
        return this.productService.deleteProductDetail(idProductDetailDto.id);
    }
};
__decorate([
    common_1.Get('filter'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_filter_dto_1.ProductFilterDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "filter", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Created successfully product',
        type: product_entity_1.Product,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    common_1.Post(':id/productDetail'),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Created successfully product detail',
        type: product_detail_entity_1.ProductDetail,
    }),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_product_dto_1.IdProductDto,
        update_product_detail_dto_1.UpdateProductDetailDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "insertProductDetail", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiResponse({
        status: 200,
        description: 'get all Product',
        type: [product_entity_1.Product],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProduct", null);
__decorate([
    common_1.Get(':id/productDetail'),
    swagger_1.ApiResponse({
        status: 200,
        description: 'get all product detail for id product',
        type: [product_detail_entity_1.ProductDetail],
    }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_product_dto_1.IdProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProductDetail", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Get a product for id',
        type: product_entity_1.Product,
    }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_product_dto_1.IdProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    common_1.Patch(':id'),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Update a product for id',
        type: product_entity_1.Product,
    }),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_product_dto_1.IdProductDto,
        update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    common_1.Patch('productDetail/:id'),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Update a product detail for id productDetail',
        type: product_detail_entity_1.ProductDetail,
    }),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_product_detail_dto_1.IdProductDetailDto,
        update_product_detail_dto_1.UpdateProductDetailDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProductDetail", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Delete a product for id Product',
        type: String,
    }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_product_dto_1.IdProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    common_1.Delete('productDetail/:id'),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Delete a product detail for id ProductDetail',
        type: String,
    }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [id_product_detail_dto_1.IdProductDetailDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProductDetail", null);
ProductController = __decorate([
    common_1.Controller('product'),
    swagger_1.ApiTags('Product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map