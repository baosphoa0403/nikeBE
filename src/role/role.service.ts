import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { IdRoleDto } from './dto/id-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const roleEntity = new this.roleModel(createRoleDto);
    return await roleEntity.save();
  }

  async findAllRoles(): Promise<Role[]> {
    return await this.roleModel.find();
  }

  async findOneRole(idRoleDto: IdRoleDto): Promise<Role> {
    const role = await this.roleModel.findById(idRoleDto.id);

    if (!role) throw new NotFoundException(`Id ${idRoleDto.id} not found`);

    return role;
  }

  async updateRole(
    idRoleDto: IdRoleDto,
    updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    const role = await this.roleModel.findById(idRoleDto.id);

    if (!role) throw new NotFoundException(`Id ${idRoleDto.id} not found`);

    role.nameRole = updateRoleDto.nameRole;
    return await role.save();
  }

  async removeRole(idRoleDto: IdRoleDto): Promise<string> {
    const role = await this.roleModel.findById(idRoleDto.id);

    if (!role) throw new NotFoundException(`Id ${idRoleDto.id} not found`);

    await role.remove();
    return `delete role ${idRoleDto.id} successfull`;
  }
}
