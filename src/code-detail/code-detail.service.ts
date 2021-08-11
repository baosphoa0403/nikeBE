import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CodeService } from 'src/code/code.service';
import { Code } from 'src/code/entities/code.entity';
import { StatusService } from 'src/status/status.service';
import { UserService } from 'src/user/user.service';
import { CreateCodeDetailDto } from './dto/create-code-detail.dto';
import { UpdateCodeDetailDto } from './dto/update-code-detail.dto';
import { CodeDetail } from './entities/code-detail.entity';

@Injectable()
export class CodeDetailService {
  constructor(
    @InjectModel(CodeDetail.name) private codeDetailModel: Model<CodeDetail> ,
    private codeService: CodeService,
    private userService: UserService,
    private statusService: StatusService
    ){}
  async create(createCodeDetailDto: CreateCodeDetailDto): Promise<string> {
    const {idCode,listIdUsers,idStatus} = createCodeDetailDto;
    for (const idUser of listIdUsers) {
      const user = await this.userService.findOneUser({id: idUser});
      const code  = await this.codeService.findOne(idCode);
      const status = await this.statusService.findOne(idStatus);
      const codeDetail =  new this.codeDetailModel({code: code, user: user, status: status});
      await codeDetail.save(); 
    }
    return "create codeDetail successfullly";
  }

  async findAll() : Promise<CodeDetail[]>{
    return await this.codeDetailModel.find({}, {__v: 0}).populate("code").populate("user").populate("status");
  }

  async findOne(id: string) {
    return await this.codeDetailModel.findById(id, {__v: 0}).populate("code").populate("user").populate("status")
  }

  update(id: number, updateCodeDetailDto: UpdateCodeDetailDto) {
    return `This action updates a #${id} codeDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} codeDetail`;
  }
}
