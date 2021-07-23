import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Gender, GenderSchema } from './entities/gender.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gender.name, schema: GenderSchema }]),
  ],
  controllers: [GenderController],
  providers: [GenderService],
})
export class GenderModule {}
