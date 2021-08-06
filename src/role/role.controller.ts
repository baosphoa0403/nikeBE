import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListRole } from 'src/auth/role/role.enum';
import { Public } from 'src/Decorator/metadata';
import { JwtAuthGuard } from 'src/Guards/jwt-auth-guard';
import { RolesGuard } from 'src/Guards/roles-guard';
import { Roles } from 'src/Guards/roles.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { IdRoleDto } from './dto/id-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('role')
@ApiTags('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles(ListRole.Admin)
  @ApiResponse({
    status: 201,
    description: 'Created successfully role',
    type: Role,
  })
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(createRoleDto);
  }

  @Get()
  @Public()
  @ApiResponse({
    status: 200,
    description: 'Get all Role',
    type: [Role],
  })
  findAllRoles(): Promise<Role[]> {
    return this.roleService.findAllRoles();
  }

  @Get(':id')
  @Public()
  @ApiResponse({
    status: 200,
    description: 'Get detail a Role',
    type: Role,
  })
  findOneRole(@Param() idRoleDto: IdRoleDto): Promise<Role> {
    return this.roleService.findOneRole(idRoleDto);
  }

  @Patch(':id')
  @Roles(ListRole.Admin)
  @ApiResponse({
    status: 200,
    description: 'Update a Role by id',
    type: Role,
  })
  updateRole(
    @Param() idRoleDto: IdRoleDto,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.roleService.updateRole(idRoleDto, updateRoleDto);
  }

  @Delete(':id')
  @Roles(ListRole.Admin)
  @ApiResponse({
    status: 200,
    description: 'Delete a Role by id',
    type: String,
  })
  deleteRole(@Param() idRoleDto: IdRoleDto): Promise<string> {
    return this.roleService.removeRole(idRoleDto);
  }
}
