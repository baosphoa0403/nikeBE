"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenderModule = void 0;
const common_1 = require("@nestjs/common");
const gender_service_1 = require("./gender.service");
const gender_controller_1 = require("./gender.controller");
const mongoose_1 = require("@nestjs/mongoose");
const gender_entity_1 = require("./entities/gender.entity");
let GenderModule = class GenderModule {
};
GenderModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: gender_entity_1.Gender.name, schema: gender_entity_1.GenderSchema }]),
        ],
        controllers: [gender_controller_1.GenderController],
        providers: [gender_service_1.GenderService],
    })
], GenderModule);
exports.GenderModule = GenderModule;
//# sourceMappingURL=gender.module.js.map