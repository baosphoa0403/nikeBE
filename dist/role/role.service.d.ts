import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { IdRoleDto } from './dto/id-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
export declare class RoleService {
    private roleModel;
    constructor(roleModel: Model<Role>);
    createRole(createRoleDto: CreateRoleDto): Promise<Role>;
    findAllRoles(): Promise<Role[]>;
    findOneRole(idRoleDto: IdRoleDto): Promise<Role>;
    updateRole(idRoleDto: IdRoleDto, updateRoleDto: UpdateRoleDto): Promise<Role>;
    removeRole(idRoleDto: IdRoleDto): Promise<string>;
}
