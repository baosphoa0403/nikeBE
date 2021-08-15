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
import { ListRole } from 'src/auth/role/role.enum';
import { Public } from 'src/Decorator/metadata';
import { GetUser } from 'src/Decorator/decorator';
import { Payload } from 'src/auth/role/payload';
import { CreateUserProfileDto } from './dto/create-userProfile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UpdatePassword } from './dto/update-password';
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a User by admin',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Public()
  @Post("/createUserProfile")
  @ApiResponse({
    status: 201,
    description: 'Create a User by user',
    type: User,
  })
  createUser(@Body() createUserProfileDto: CreateUserProfileDto) {
    return this.userService.createUserProfile(createUserProfileDto);
  }

  @Get()
  @Roles(ListRole.Admin)
  @ApiResponse({
    status: 200,
    description: 'Get all User',
    type: [User],
  })
  findAll(): Promise<User[]> {
    return this.userService.findAllUser();
  }

  @Get('/detail')
  @Roles(ListRole.Admin, ListRole.User)
  @ApiResponse({
    status: 200,
    description: 'Get a User by id',
    type: User,
  })
  findOne(@GetUser() payload: Payload): Promise<User> {
    return this.userService.findOneUser({ id: payload.userId });
  }

  @Patch('/update/:id')
  @Roles(ListRole.Admin)
  @ApiResponse({
    status: 200,
    description: 'Update a User by id role admin',
    type: User,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser({id: id}, updateUserDto);
  }

  @Patch('/updateProfileUser')
  @Roles(ListRole.User)
  @ApiResponse({
    status: 200,
    description: 'Update a User by id role user',
    type: User,
  })
  updateProfileUser(
    @GetUser() payload: Payload,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<User> {
    return this.userService.updateUserProfile({ id: payload.userId }, updateUserProfileDto);
  }

  @Patch("/updatePassword")
  @Roles(ListRole.User)
  @ApiResponse({
    status: 200,
    description: 'Update password by user',
    type: String,
  })
  updatePassword( @GetUser() payload: Payload, @Body() password: UpdatePassword){
    return this.userService.updatePassword(password, {id: payload.userId});
  }


  @Delete(':id')
  @Roles(ListRole.Admin)
  @ApiResponse({
    status: 200,
    description: 'Delete a User by id',
    type: String,
  })
  remove(@Param() idUserDto: IdUserDto): Promise<string> {
    return this.userService.removeUser(idUserDto);
  }
}
