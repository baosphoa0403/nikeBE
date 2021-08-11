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
const status_enum_1 = require("../common/status.enum");
const gender_entity_1 = require("../gender/entities/gender.entity");
const image_entity_1 = require("../image/entities/image.entity");
const size_entity_1 = require("../size/entities/size.entity");
const status_entity_1 = require("../status/entities/status.entity");
const product_detail_entity_1 = require("./entities/product-detail.entity");
const product_entity_1 = require("./entities/product.entity");
let ProductService = class ProductService {
    constructor(productModel, productDetailModel, categoryModel, statusModel, colorModel, genderModel, sizeModel, imageModel) {
        this.productModel = productModel;
        this.productDetailModel = productDetailModel;
        this.categoryModel = categoryModel;
        this.statusModel = statusModel;
        this.colorModel = colorModel;
        this.genderModel = genderModel;
        this.sizeModel = sizeModel;
        this.imageModel = imageModel;
    }
    async findWithFilter(filter) {
        const activeStatus = await this.findStatusWithName(status_enum_1.StatusEnum.Active);
        const products = await this.productModel.find({
            name: {
                $regex: new RegExp('.*' + filter.name ? filter.name : '' + '.*'),
                $options: 'i',
            },
        });
        const genders = filter.genderId
            ? await this.genderModel.find({
                _id: { $in: filter.genderId },
            })
            : await this.genderModel.find();
        const colors = filter.colorId
            ? await this.colorModel.find({ _id: { $in: filter.colorId } })
            : await this.colorModel.find();
        const sizes = filter.sizeId
            ? await this.sizeModel.find({ _id: { $in: filter.sizeId } })
            : await this.sizeModel.find();
        const details = await this.productDetailModel
            .find({
            product: { $in: products },
            gender: { $in: genders },
            color: { $in: colors },
            size: { $in: sizes },
            quantity: { $gt: 0 },
            status: activeStatus,
        })
            .populate('product')
            .populate('gender')
            .populate('size')
            .populate('color');
        const result = [];
        for (const detail of details) {
            const tmp = result.find((item) => item.product === detail.product);
            if (tmp) {
                const images = await this.imageModel.find({ idShoesDetail: detail });
                tmp.details.push({
                    info: detail.depopulate('product'),
                    images: images,
                });
            }
            else {
                const images = await this.imageModel.find({ idShoesDetail: detail });
                result.push({
                    product: detail.product,
                    details: [{ info: detail.depopulate('product'), images: images }],
                });
            }
        }
        return result;
    }
    async findStatusWithName(name) {
        return await this.statusModel
            .findOne({
            nameStatus: name,
        })
            .catch(() => {
            throw new common_1.BadRequestException('something wrong');
        });
    }
    async createProduct(createProductDto) {
        const { name, categoryId, createDate } = createProductDto;
        const category = await this.categoryModel.findById(categoryId);
        if (!category)
            throw new common_1.NotFoundException('category not existed');
        const product = new this.productModel({ name, category, createDate });
        return (await product.save()).populate('category');
    }
    async getAllProduct() {
        const activeStatus = await this.findStatusWithName(status_enum_1.StatusEnum.Active);
        const products = await this.productModel.find().populate('category');
        const result = [];
        for (const product of products) {
            const details = await this.productDetailModel.find({
                product,
                status: activeStatus,
                quantity: { $gt: 0 },
            });
            if (details.length > 0) {
                console.log(details);
                result.push(product);
            }
        }
        return result;
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
        const inActiveStatus = await this.findStatusWithName(status_enum_1.StatusEnum.Inactive);
        await this.productDetailModel.updateMany({ product }, { status: inActiveStatus });
        return `delete product ${idProduct} successful`;
    }
    async insertDetail(idProduct, createProductDetailDto) {
        const { statusId, colorId, genderId, price, quantity, sizeId } = createProductDetailDto;
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
        const size = await this.sizeModel.findById(sizeId);
        if (!size)
            throw new common_1.NotFoundException('size not existed');
        const productDetail = await new this.productDetailModel({
            product,
            status,
            color,
            gender,
            size,
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
        const activeStatus = await this.findStatusWithName(status_enum_1.StatusEnum.Active);
        const productDetails = await this.productDetailModel
            .find({ product: product, status: activeStatus, quantity: { $gt: 0 } }, { product: 0 })
            .populate('status')
            .populate('color')
            .populate('gender');
        return productDetails;
    }
    async updateProductDetail(idProductDetail, updateProductDetailDto) {
        const { statusId, colorId, genderId, price, quantity, sizeId } = updateProductDetailDto;
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
        let size = null;
        size = await this.sizeModel.findById(sizeId);
        if (!size)
            throw new common_1.NotFoundException('size not existed');
        const productDetail = await this.productDetailModel
            .findByIdAndUpdate(idProductDetail, {
            status,
            color,
            gender,
            size,
            price,
            quantity,
        }, { new: true, runValidators: true })
            .populate('status')
            .populate('color')
            .populate('gender');
        return productDetail;
    }
    async deleteProductDetail(idProductDetail) {
        const inActiveStatus = await this.findStatusWithName(status_enum_1.StatusEnum.Inactive);
        const productDetail = await this.productDetailModel.findByIdAndUpdate({ _id: idProductDetail }, { status: inActiveStatus });
        if (!productDetail)
            throw new common_1.NotFoundException('product detail not existed');
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
    __param(6, mongoose_1.InjectModel(size_entity_1.Size.name)),
    __param(7, mongoose_1.InjectModel(image_entity_1.Image.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map