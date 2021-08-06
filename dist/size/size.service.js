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
exports.SizeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const size_entity_1 = require("./entities/size.entity");
let SizeService = class SizeService {
    constructor(sizeModel) {
        this.sizeModel = sizeModel;
    }
    async create(createSizeDto) {
        const createdSize = new this.sizeModel(createSizeDto);
        return await createdSize.save();
    }
    async findAll() {
        return await this.sizeModel.find();
    }
    async findOne(id) {
        let size;
        try {
            size = await this.sizeModel.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`id = ${id} is invalid`);
        }
        if (!size) {
            throw new common_1.NotFoundException(`Could not find size with id = ${id}`);
        }
        return size;
    }
    async update(id, updateSizeDto) {
        let updatedSize = await this.findOne(id);
        updatedSize = await this.sizeModel.findByIdAndUpdate(id, updateSizeDto, {
            new: true,
            runValidators: true,
        });
        return updatedSize;
    }
    async remove(id) {
        const size = await this.findOne(id);
        await this.sizeModel.deleteOne({ _id: id });
        return `delete size id = ${id} successfully`;
    }
};
SizeService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(size_entity_1.Size.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SizeService);
exports.SizeService = SizeService;
//# sourceMappingURL=size.service.js.map