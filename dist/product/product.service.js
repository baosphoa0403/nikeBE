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
const image_service_1 = require("../image/image.service");
const size_entity_1 = require("../size/entities/size.entity");
const status_entity_1 = require("../status/entities/status.entity");
const product_detail_entity_1 = require("./entities/product-detail.entity");
const product_entity_1 = require("./entities/product.entity");
const quantity_entity_1 = require("./entities/quantity.entity");
const product_detail_1 = require("./response/product-detail");
let ProductService = class ProductService {
    constructor(productModel, productDetailModel, categoryModel, statusModel, colorModel, genderModel, sizeModel, imageModel, imageService, quantityModel) {
        this.productModel = productModel;
        this.productDetailModel = productDetailModel;
        this.categoryModel = categoryModel;
        this.statusModel = statusModel;
        this.colorModel = colorModel;
        this.genderModel = genderModel;
        this.sizeModel = sizeModel;
        this.imageModel = imageModel;
        this.imageService = imageService;
        this.quantityModel = quantityModel;
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
            status: activeStatus,
        }, { __v: 0 })
            .populate('product', { __v: 0 })
            .populate('gender', { __v: 0 })
            .populate('color', { __v: 0 });
        const result = [];
        for (const detail of details) {
            const tmp = result.find((item) => item.product === detail.product);
            if (tmp) {
                const images = await this.imageModel.find({ idShoesDetail: detail }, { __v: 0 });
                const quantities = await this.quantityModel.find({
                    productDetail: detail,
                }, { __v: 0 });
                tmp.details.push({
                    info: detail.depopulate('product'),
                    quantities: quantities,
                    images: images,
                });
            }
            else {
                const images = await this.imageModel.find({ idShoesDetail: detail }, { __v: 0 });
                const quantities = await this.quantityModel.find({
                    productDetail: detail,
                }, { __v: 0 });
                result.push({
                    product: detail.product,
                    details: [
                        {
                            info: detail.depopulate('product'),
                            quantities: quantities,
                            images: images,
                        },
                    ],
                });
            }
        }
        return result;
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
        const products = await this.productModel
            .find({}, { __v: 0 })
            .populate('category', { __v: 0 });
        return products;
    }
    async findOne(idProduct) {
        const product = await this.productModel
            .findById(idProduct, { __v: 0 })
            .populate('category', { __v: 0 });
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
            .populate('category', { __v: 0 });
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
        const { statusId, colorId, genderId, imageUrls, quantities } = createProductDetailDto;
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
        const response = new product_detail_1.ProductDetailResponse();
        const productDetail = await new this.productDetailModel({
            product,
            status,
            color,
            gender,
        })
            .save()
            .catch(() => {
            throw new common_1.BadRequestException('Insert detail not success');
        });
        response.info = productDetail.depopulate('product');
        for (const url of imageUrls) {
            const img = await this.imageService.create({
                urlImage: url,
                idShoesDetail: productDetail._id,
            });
            if (!response.images)
                response.images = [];
            response.images.push(img.depopulate('idShoesDetail'));
        }
        for (const quantity of quantities) {
            const size = await this.sizeModel.findById(quantity.sizeId).catch(() => {
                throw new common_1.BadRequestException('Insert detail not success');
            });
            if (!size)
                throw new common_1.BadRequestException('Insert detail not success');
            const quantityEntity = await new this.quantityModel({
                quantity: quantity.quantity,
                size: size,
                price: quantity.price,
                productDetail: productDetail,
            })
                .save()
                .catch(() => {
                throw new common_1.NotFoundException('Insert detail not success');
            });
            if (!response.quantities)
                response.quantities = [];
            response.quantities.push(quantityEntity.depopulate('productDetail'));
        }
        return response;
    }
    async getAllProductDetail(idProduct) {
        const product = await this.findOne(idProduct);
        const activeStatus = await this.findStatusWithName(status_enum_1.StatusEnum.Active);
        const response = [];
        const productDetails = await this.productDetailModel
            .find({ product: product, status: activeStatus }, { __v: 0 })
            .populate('status', { __v: 0 })
            .populate('color', { __v: 0 })
            .populate('gender', { __v: 0 });
        for (const detail of productDetails) {
            const quantities = await this.quantityModel.find({
                productDetail: detail,
                quantity: { $gt: 0 },
            }, { __v: 0 });
            if (quantities.length > 0) {
                const images = await this.imageModel.find({ idShoesDetail: detail }, { __v: 0 });
                response.push({ info: detail, quantities, images });
            }
        }
        return response;
    }
    async updateProductDetail(idProductDetail, updateProductDetailDto) {
        const { statusId, colorId, genderId, imageUrls, quantities } = updateProductDetailDto;
        const status = await this.statusModel.findById(statusId);
        if (!status)
            throw new common_1.NotFoundException('status not existed');
        const color = await this.colorModel.findById(colorId);
        if (!color)
            throw new common_1.NotFoundException('color not existed');
        const gender = await this.genderModel.findById(genderId);
        if (!gender)
            throw new common_1.NotFoundException('gender not existed');
        const response = new product_detail_1.ProductDetailResponse();
        const productDetail = await this.productDetailModel.findByIdAndUpdate({ _id: idProductDetail }, {
            status: status,
            color: color,
            gender: gender,
        });
        response.info = productDetail;
        if (imageUrls.length > 0) {
            await this.imageModel.deleteMany({ idShoesDetail: productDetail });
            for (const url of imageUrls) {
                const img = await this.imageService.create({
                    urlImage: url,
                    idShoesDetail: productDetail._id,
                });
                if (!response.images)
                    response.images = [];
                response.images.push(img.depopulate('idShoesDetail'));
            }
        }
        if (quantities.length > 0) {
            await this.quantityModel.deleteMany({ productDetail: productDetail });
            for (const quantity of quantities) {
                const size = await this.sizeModel
                    .findById(quantity.sizeId)
                    .catch(() => {
                    throw new common_1.BadRequestException('Update detail failed');
                });
                if (!size)
                    throw new common_1.BadRequestException('Update detail failed');
                const quantityEntity = await new this.quantityModel({
                    quantity: quantity.quantity,
                    size: size,
                    price: quantity.price,
                    productDetail: productDetail,
                })
                    .save()
                    .catch(() => {
                    throw new common_1.NotFoundException('Insert detail not success');
                });
                if (!response.quantities)
                    response.quantities = [];
                response.quantities.push(quantityEntity.depopulate('productDetail'));
            }
        }
        return response;
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
    __param(9, mongoose_1.InjectModel(quantity_entity_1.Quantity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        image_service_1.ImageService,
        mongoose_2.Model])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map