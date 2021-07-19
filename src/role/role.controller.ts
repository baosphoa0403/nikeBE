import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/createRole.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@Controller('role')
@ApiTags('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created successfully role',
  })
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(createRoleDto);
  }
}
