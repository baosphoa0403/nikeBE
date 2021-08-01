import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdRoleDto } from 'src/role/dto/id-role.dto';
import { Role } from 'src/role/entities/role.entity';
import { Status } from 'src/status/entities/status.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { IdUserDto } from './dto/id-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Status.name) private StatusModel: Model<Status>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const {
      username,
      password,
      email,
      name,
      yearOfBirth,
      address,
      statusId,
      roleId,
    } = createUserDto;

    const user = new this.userModel({
      username,
      password,
      email,
      name,
      yearOfBirth,
      address,
      status: statusId,
      role: roleId,
    });
    const userSave = await user.save();
    return await this.userModel
      .findById(userSave._id, { password: 0 })
      .populate('role');
  }

  async findAllUser(): Promise<User[]> {
    return await this.userModel.find({}, { password: 0 }).populate('role');
  }

  async findOneUser(idUserDto: IdUserDto): Promise<User> {
    const user = await this.userModel
      .findById(idUserDto.id, { password: 0 })
      .populate('role');

    if (!user) throw new NotFoundException(`id ${idUserDto.id} not found`);

    return user;
  }
  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email }).populate('role');
  }

  async updateUser(
    idUserDto: IdUserDto,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userModel.findById(idUserDto.id).populate('role');
    const role = await this.roleModel.findById(updateUserDto.roleId);
    const status = await this.StatusModel.findById(updateUserDto.statusId);

    if (!user)
      throw new NotFoundException(`id user: ${idUserDto.id} not found`);
    if (!role)
      throw new NotFoundException(`id role: ${updateUserDto.roleId} not found`);
    if (!status)
      throw new NotFoundException(
        `id status: ${updateUserDto.statusId} not found`,
      );

    user.password = updateUserDto.password;
    user.email = updateUserDto.email;
    user.name = updateUserDto.name;
    user.yearOfBirth = updateUserDto.yearOfBirth;
    user.address = updateUserDto.address;
    user.status = status;
    user.role = role;

    const userSave = await user.save();
    return await this.userModel
      .findById(userSave._id, { password: 0 })
      .populate('role');
  }

  async removeUser(idUserDto: IdUserDto): Promise<string> {
    const user = await this.userModel.findById(idUserDto.id).populate('role');

    if (!user)
      throw new NotFoundException(`id user: ${idUserDto.id} not found`);

    await user.remove();
    return `delete user ${idUserDto.id} successfull`;
  }
}
