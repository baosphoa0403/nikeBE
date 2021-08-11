import { Module } from '@nestjs/common';
import { CodeDetailService } from './code-detail.service';
import { CodeDetailController } from './code-detail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CodeDetail, CodeDetailSchema } from './entities/code-detail.entity';
import { CodeModule } from 'src/code/code.module';
import { UserModule } from 'src/user/user.module';
import { StatusModule } from 'src/status/status.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: CodeDetail.name, schema: CodeDetailSchema}
    ]),
    CodeModule,
    UserModule,
    StatusModule
  ],
  controllers: [CodeDetailController],
  providers: [CodeDetailService]
})
export class CodeDetailModule {}
