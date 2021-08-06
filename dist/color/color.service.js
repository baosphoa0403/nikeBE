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
exports.ColorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const color_entity_1 = require("./entities/color.entity");
let ColorService = class ColorService {
    constructor(colorModel) {
        this.colorModel = colorModel;
    }
    async create(createColorDto) {
        const createdColor = new this.colorModel(createColorDto);
        return await createdColor.save();
    }
    async findAll() {
        return await this.colorModel.find();
    }
    async findOne(id) {
        let color;
        try {
            color = await this.colorModel.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`id = ${id} is invalid format`);
        }
        if (!color) {
            throw new common_1.NotFoundException(`Could not find color with id = ${id}`);
        }
        return color;
    }
    async update(id, updateColorDto) {
        let updatedColor = await this.findOne(id);
        updatedColor = await this.colorModel.findByIdAndUpdate(id, updateColorDto, {
            new: true,
            runValidators: true,
        });
        return updatedColor;
    }
    async remove(id) {
        await this.colorModel.deleteOne({ _id: id });
        return `delete nameColor ${id} successfully`;
    }
};
ColorService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(color_entity_1.Color.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ColorService);
exports.ColorService = ColorService;
//# sourceMappingURL=color.service.js.map