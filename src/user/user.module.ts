import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Role, RoleSchema } from 'src/role/entities/role.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      {name: Role.name, schema: RoleSchema},
    ]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
