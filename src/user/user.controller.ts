import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IdUserDto } from './dto/id-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/Guards/jwt-auth-guard';
import { RolesGuard } from 'src/Guards/roles-guard';
import { Roles } from 'src/Guards/roles.decorator';
import { Role } from 'src/auth/role/role.enum';
import { Public } from 'src/Decorator/metadata';
import { GetUser } from 'src/Decorator/decorator';
import { Payload } from 'src/auth/role/payload';
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a User',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'Get all User',
    type: [User],
  })
  findAll(): Promise<User[]> {
    return this.userService.findAllUser();
  }

  @Get('/detail')
  @Roles(Role.Admin, Role.User)
  @ApiResponse({
    status: 200,
    description: 'Get a User by id',
    type: User,
  })
  findOne(@GetUser() payload: Payload): Promise<User> {
    return this.userService.findOneUser({ id: payload.userId });
  }

  @Patch('/update')
  @Roles(Role.Admin, Role.User)
  @ApiResponse({
    status: 200,
    description: 'Update a User by id',
    type: User,
  })
  update(
    @GetUser() payload: Payload,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser({ id: payload.userId }, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'Delete a User by id',
    type: String,
  })
  remove(@Param() idUserDto: IdUserDto): Promise<string> {
    return this.userService.removeUser(idUserDto);
  }
}
