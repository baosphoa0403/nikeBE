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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const category_service_1 = require("./category.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const category_entity_1 = require("./entities/category.entity");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    create(createCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }
    findAll() {
        return this.categoryService.findAll();
    }
    findOne(id) {
        const category = this.categoryService.findOne(id);
        return category;
    }
    update(id, updateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto);
    }
    remove(id) {
        return this.categoryService.remove(id);
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiResponse({
        status: 201,
        description: 'Created successfully category',
        type: category_entity_1.Category,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "create", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOkResponse({
        status: 200,
        description: 'Get Detail Category',
        type: [category_entity_1.Category],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOkResponse({
        status: 200,
        description: 'Get Detail Category',
        type: category_entity_1.Category,
    }),
    swagger_1.ApiBadRequestResponse({ status: 404, description: 'Not found ID' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    swagger_1.ApiAcceptedResponse({
        status: 200,
        description: 'Update Category',
        type: category_entity_1.Category,
    }),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiOkResponse({
        status: 200,
        description: 'Remove Category',
        type: category_entity_1.Category,
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "remove", null);
CategoryController = __decorate([
    common_1.Controller('category'),
    swagger_1.ApiTags('Category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map