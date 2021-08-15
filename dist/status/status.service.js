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
exports.StatusService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const status_enum_1 = require("../common/status.enum");
const product_entity_1 = require("../product/entities/product.entity");
const product_service_1 = require("../product/product.service");
const status_entity_1 = require("./entities/status.entity");
let StatusService = class StatusService {
    constructor(statusModel, productService) {
        this.statusModel = statusModel;
        this.productService = productService;
    }
    async create(createStatusDto) {
        const status = new this.statusModel(createStatusDto);
        return await status.save();
    }
    async findAll() {
        return await this.statusModel.find().populate('listProduct');
    }
    async findByName(name) {
        return await this.statusModel.findOne({ nameStatus: name });
    }
    async findOne(id) {
        let status;
        try {
            status = await this.statusModel.findById(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(id + ' invalid format');
        }
        if (!status) {
            throw new common_1.NotFoundException('id ' + id + ' not found in class ' + status_entity_1.Status.name);
        }
        return status;
    }
    async update(id, updateStatusDto) {
        const { nameStatus } = updateStatusDto;
        const status = await this.statusModel.findById(id);
        status.nameStatus = nameStatus;
        return await status.save();
    }
    async remove(id) {
        let status;
        try {
            status = await this.statusModel.findById(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(id + ' invalid format');
        }
        if (!status) {
            throw new common_1.NotFoundException('id ' + id + ' not found in class ' + status_entity_1.Status.name);
        }
        status.remove();
        return `delete status ${id} successfull`;
    }
};
StatusService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(status_entity_1.Status.name)),
    __param(1, common_1.Inject(common_1.forwardRef(() => product_service_1.ProductService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        product_service_1.ProductService])
], StatusService);
exports.StatusService = StatusService;
//# sourceMappingURL=status.service.js.map