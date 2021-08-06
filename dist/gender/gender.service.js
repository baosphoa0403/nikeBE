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
exports.GenderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const gender_entity_1 = require("./entities/gender.entity");
let GenderService = class GenderService {
    constructor(genderModel) {
        this.genderModel = genderModel;
    }
    async create(createGenderDto) {
        const createdGender = new this.genderModel(createGenderDto);
        return await createdGender.save();
    }
    async findAll() {
        return await this.genderModel.find();
    }
    async findOne(id) {
        let gender;
        try {
            gender = await this.genderModel.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`id = ${id} is invalid`);
        }
        if (!gender) {
            throw new common_1.NotFoundException(`Could not find color with id = ${id}`);
        }
        return gender;
    }
    async update(id, updateGenderDto) {
        let updatedGender = await this.findOne(id);
        updatedGender = await this.genderModel.findByIdAndUpdate(id, updateGenderDto, {
            new: true,
            runValidators: true,
        });
        return updatedGender;
    }
    async remove(id) {
        const gender = await this.findOne(id);
        await this.genderModel.deleteOne({ _id: id });
        return `delete nameGender ${id} successfully`;
    }
};
GenderService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(gender_entity_1.Gender.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GenderService);
exports.GenderService = GenderService;
//# sourceMappingURL=gender.service.js.map