import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdRoleDto } from 'src/role/dto/id-role.dto';
import { Role } from 'src/role/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { IdUserDto } from './dto/id-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email, name, yearOfBirth, address, roleId } =
      createUserDto;
    const user = new this.userModel({
      username,
      password,
      email,
      name,
      yearOfBirth,
      address,
      role: roleId,
    });
    return await await user.save();
  }

  async findAllUser(): Promise<User[]> {
    return await this.userModel.find().populate('role');
  }

  async findOneUser(idUserDto: IdRoleDto): Promise<User> {
    const user = await this.userModel.findById(idUserDto.id).populate('role');

    if (!user) throw new NotFoundException(`id ${idUserDto.id} not found`);

    return user;
  }

  async updateUser(
    idUserDto: IdRoleDto,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userModel.findById(idUserDto.id).populate('role');
    const role = await this.roleModel.findById(updateUserDto.roleId);

    if (!user)
      throw new NotFoundException(`id user: ${idUserDto.id} not found`);
    if (!role)
      throw new NotFoundException(`id role: ${updateUserDto.roleId} not found`);

    console.log(role);

    user.password = updateUserDto.password;
    user.email = updateUserDto.email;
    user.name = updateUserDto.name;
    user.yearOfBirth = updateUserDto.yearOfBirth;
    user.address = updateUserDto.address;
    user.role = role;

    return await user.save();
  }

  async removeUser(idUserDto: IdUserDto): Promise<string> {
    const user = await this.userModel.findById(idUserDto.id).populate('role');

    if (!user)
      throw new NotFoundException(`id user: ${idUserDto.id} not found`);

    await user.remove();
    return `delete user ${idUserDto.id} successfull`
  }
}
