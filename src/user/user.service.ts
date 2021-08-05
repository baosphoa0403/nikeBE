import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { exception } from 'console';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IdRoleDto } from 'src/role/dto/id-role.dto';
import { Role } from 'src/role/entities/role.entity';
import { Status } from 'src/status/entities/status.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { IdUserDto } from './dto/id-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { StatusEnum } from 'src/common/status.enum';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Status.name) private StatusModel: Model<Status>,
  ) {}

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async findStatusWithName(name: string): Promise<Status> {
    return await this.StatusModel.findOne({
      nameStatus: name,
    }).catch(() => {
      throw new BadRequestException('something wrong');
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const password = await this.hashPassword(createUserDto.password, salt);

    const { username, email, name, yearOfBirth, address, statusId, roleId } =
      createUserDto;

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

    const userSave = await user.save().catch((err) => {
      throw new BadRequestException('Username or email is existed');
    });
    return this.userModel
      .findById(userSave._id, { password: 0 })
      .populate('role')
      .populate('status');
  }

  async findAllUser(): Promise<User[]> {
    const activeStatus = await this.findStatusWithName(StatusEnum.Active);

    return await this.userModel
      .find({ status: activeStatus }, { password: 0 })
      .populate('role')
      .populate('status')
      .catch(() => {
        throw new BadRequestException('some thing wrong');
      });
  }

  async findOneUser(idUserDto: IdUserDto): Promise<User> {
    const activeStatus = await this.findStatusWithName(StatusEnum.Active);
    const user = await this.userModel
      .findOne({ _id: idUserDto.id, status: activeStatus }, { password: 0 })
      .populate('role')
      .populate('status');

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

    const salt = await bcrypt.genSalt();
    const hashpassword = this.hashPassword(updateUserDto.password, salt);
    const { name, email, yearOfBirth, address } = updateUserDto;

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        idUserDto.id,
        { name, email, hashpassword, yearOfBirth, address, status, role },
        { new: true, runValidators: true },
      )
      .populate('role')
      .populate('status');

    return updatedUser;
  }

  async removeUser(idUserDto: IdUserDto): Promise<string> {
    const user = await this.findOneUser(idUserDto);
    if (!user)
      throw new NotFoundException(`id user: ${idUserDto.id} not found`);
    const inActiveStatus = await this.findStatusWithName(StatusEnum.Inactive);
    await this.userModel
      .findByIdAndUpdate(
        idUserDto.id,
        {
          status: inActiveStatus,
        },
        { new: true, runValidators: true },
      )
      .catch(() => {
        throw new BadRequestException('some thing wrong');
      });

    return `delete user ${idUserDto.id} successfull`;
  }
}
