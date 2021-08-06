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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_entity_1 = require("../category/entities/category.entity");
const color_entity_1 = require("../color/entities/color.entity");
const gender_entity_1 = require("../gender/entities/gender.entity");
const status_entity_1 = require("../status/entities/status.entity");
const product_detail_entity_1 = require("./entities/product-detail.entity");
const product_entity_1 = require("./entities/product.entity");
let ProductService = class ProductService {
    constructor(productModel, productDetailModel, categoryModel, statusModel, colorModel, genderModel) {
        this.productModel = productModel;
        this.productDetailModel = productDetailModel;
        this.categoryModel = categoryModel;
        this.statusModel = statusModel;
        this.colorModel = colorModel;
        this.genderModel = genderModel;
    }
    async createProduct(createProductDto) {
        const { name, categoryId } = createProductDto;
        const category = await this.categoryModel.findById(categoryId);
        if (!category)
            throw new common_1.NotFoundException('category not existed');
        const product = new this.productModel({ name, category });
        return (await product.save()).populate('category');
    }
    async getAllProduct() {
        return await this.productModel.find().populate('category');
    }
    async findOne(idProduct) {
        const product = await this.productModel
            .findById(idProduct)
            .populate('category');
        if (!product)
            throw new common_1.NotFoundException('product not existed');
        return product;
    }
    async updateProduct(idProduct, updateProductDto) {
        const { name, categoryId } = updateProductDto;
        const category = await this.categoryModel.findById(categoryId);
        if (!category)
            throw new common_1.NotFoundException('category not existed');
        const product = this.productModel
            .findByIdAndUpdate(idProduct, { name, category }, { new: true, runValidators: true })
            .populate('category');
        return product;
    }
    async deleteProduct(idProduct) {
        const product = await this.productModel.findById(idProduct);
        if (!product)
            throw new common_1.NotFoundException('product not existed');
        await product.remove();
        return `delete product ${idProduct} successful`;
    }
    async insertDetail(idProduct, createProductDetailDto) {
        const { statusId, colorId, genderId, price, quantity } = createProductDetailDto;
        const product = await this.findOne(idProduct);
        const status = await this.statusModel.findById(statusId);
        if (!status)
            throw new common_1.NotFoundException('status not existed');
        const color = await this.colorModel.findById(colorId);
        if (!color)
            throw new common_1.NotFoundException('color not existed');
        const gender = await this.genderModel.findById(genderId);
        if (!gender)
            throw new common_1.NotFoundException('gender not existed');
        const productDetail = await new this.productDetailModel({
            product,
            status,
            color,
            gender,
            price,
            quantity,
        });
        return (await productDetail.save())
            .populate('product')
            .populate('status')
            .populate('color')
            .populate('gender');
    }
    async getAllProductDetail(idProduct) {
        const product = await this.findOne(idProduct);
        const productDetails = await this.productDetailModel
            .find({ product: product }, { product: 0 })
            .populate('status')
            .populate('color')
            .populate('gender');
        return productDetails;
    }
    async updateProductDetail(idProductDetail, updateProductDetailDto) {
        const { statusId, colorId, genderId, price, quantity } = updateProductDetailDto;
        let status = null;
        status = await this.statusModel.findById(statusId);
        if (!status)
            throw new common_1.NotFoundException('status not existed');
        let color = null;
        color = await this.colorModel.findById(colorId);
        if (!color)
            throw new common_1.NotFoundException('color not existed');
        let gender = null;
        gender = await this.genderModel.findById(genderId);
        if (!gender)
            throw new common_1.NotFoundException('gender not existed');
        const productDetail = await this.productDetailModel
            .findByIdAndUpdate(idProductDetail, {
            status,
            color,
            gender,
            price,
            quantity,
        }, { new: true, runValidators: true })
            .populate('status')
            .populate('color')
            .populate('gender');
        return productDetail;
    }
    async deleteProductDetail(idProductDetail) {
        const productDetail = await this.productDetailModel.findById(idProductDetail);
        if (!productDetail)
            throw new common_1.NotFoundException('product detail not existed');
        await productDetail.remove();
        return `delete product detail ${idProductDetail} successful`;
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(product_entity_1.Product.name)),
    __param(1, mongoose_1.InjectModel(product_detail_entity_1.ProductDetail.name)),
    __param(2, mongoose_1.InjectModel(category_entity_1.Category.name)),
    __param(3, mongoose_1.InjectModel(status_entity_1.Status.name)),
    __param(4, mongoose_1.InjectModel(color_entity_1.Color.name)),
    __param(5, mongoose_1.InjectModel(gender_entity_1.Gender.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map