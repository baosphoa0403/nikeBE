import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Role, RoleSchema } from "./entities/role.entity";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: Role.name, schema: RoleSchema},
        ]),
    ],
    controllers:[RoleController],
    providers:[RoleService],
})

export class RoleModule{}