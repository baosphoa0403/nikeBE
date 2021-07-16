import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateRoleDto } from "./dto/create-role.dto";
import { IdRoleDto } from "./dto/id-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Role } from "./entities/role.entity";
import { RoleService } from "./role.service";

@Controller('role')
@ApiTags('Role')
export class RoleController{
    
    constructor(
        private readonly roleService: RoleService
    ){}

    @Post()
    @ApiResponse({
        status: 201,
        description: 'Created successfully role',
        type: Role,
    })
    createRole(@Body() createRoleDto: CreateRoleDto):Promise<Role>{
        return this.roleService.createRole(createRoleDto);
    }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Get all Role',
        type: [Role],
    })
    findAllRoles():Promise<Role[]>{
        return this.roleService.findAllRoles();
    }
    
    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'Get detail a Role',
        type: Role,
    })
    findOneRole(@Param() idRoleDto: IdRoleDto):Promise<Role>{
        return this.roleService.findOneRole(idRoleDto);
    }

    @Patch(':id')
    @ApiResponse({
        status: 200,
        description: 'Update a Role by id',
        type: Role,
    })
    updateRole(
        @Param() idRoleDto:IdRoleDto,
        @Body() updateRoleDto: UpdateRoleDto
        ):Promise<Role>{
        return this.roleService.updateRole(idRoleDto, updateRoleDto);
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'Delete a Role by id',
        type: String,
    })
    deleteRole(@Param() idRoleDto: IdRoleDto):Promise<string>{
        return this.roleService.removeRole(idRoleDto);
    }
}