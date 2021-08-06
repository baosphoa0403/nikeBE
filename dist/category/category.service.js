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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_entity_1 = require("./entities/category.entity");
let CategoryService = class CategoryService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(createCategoryDto) {
        const category = new this.productModel(createCategoryDto);
        return category.save();
    }
    async findAll() {
        return await this.productModel.find();
    }
    async findOne(id) {
        let category;
        try {
            category = await this.productModel.findById(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(id + ' invalid format');
        }
        if (!category) {
            throw new common_1.NotFoundException('id ' + id + ' not found in class ' + category_entity_1.Category.name);
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        let category;
        try {
            category = await this.productModel.findById(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(id + ' invalid format');
        }
        if (!category) {
            throw new common_1.NotFoundException('id ' + id + ' not found in class ' + category_entity_1.Category.name);
        }
        category.nameCategory = updateCategoryDto.nameCategory;
        return await category.save();
    }
    async remove(id) {
        let category;
        try {
            category = await this.productModel.findById(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(id + ' invalid format');
        }
        if (!category) {
            throw new common_1.NotFoundException('id ' + id + ' not found in class ' + category_entity_1.Category.name);
        }
        category.remove();
        return `delete category ${id} successfull`;
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(category_entity_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map