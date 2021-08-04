import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IdUserDto } from './dto/id-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/Guards/jwt-auth-guard';
import { LocalAuthGuard } from 'src/Guards/local-auth-guard';
import { RolesGuard } from 'src/Guards/roles-guard';
import { Roles } from 'src/Guards/roles.decorator';
import { Role } from 'src/auth/role/role.enum';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'Get all User',
    type: [User],
  })
  findAll(): Promise<User[]> {
    return this.userService.findAllUser();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get a User by id',
    type: User,
  })
  findOne(@Param() idUserDto: IdUserDto): Promise<User> {
    return this.userService.findOneUser(idUserDto);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update a User by id',
    type: User,
  })
  update(
    @Param() idUserDto: IdUserDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(idUserDto, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete a User by id',
    type: String,
  })
  remove(@Param() idUserDto: IdUserDto): Promise<string> {
    return this.userService.removeUser(idUserDto);
  }
}
