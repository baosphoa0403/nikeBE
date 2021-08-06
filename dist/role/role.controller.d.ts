import { CreateRoleDto } from './dto/create-role.dto';
import { IdRoleDto } from './dto/id-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    createRole(createRoleDto: CreateRoleDto): Promise<Role>;
    findAllRoles(): Promise<Role[]>;
    findOneRole(idRoleDto: IdRoleDto): Promise<Role>;
    updateRole(idRoleDto: IdRoleDto, updateRoleDto: UpdateRoleDto): Promise<Role>;
    deleteRole(idRoleDto: IdRoleDto): Promise<string>;
}
