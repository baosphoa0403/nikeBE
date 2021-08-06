"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeModule = void 0;
const common_1 = require("@nestjs/common");
const size_service_1 = require("./size.service");
const size_controller_1 = require("./size.controller");
const mongoose_1 = require("@nestjs/mongoose");
const size_entity_1 = require("./entities/size.entity");
let SizeModule = class SizeModule {
};
SizeModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: size_entity_1.Size.name, schema: size_entity_1.SizeSchema }]),
        ],
        controllers: [size_controller_1.SizeController],
        providers: [size_service_1.SizeService],
    })
], SizeModule);
exports.SizeModule = SizeModule;
//# sourceMappingURL=size.module.js.map