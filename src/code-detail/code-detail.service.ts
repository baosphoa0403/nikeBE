import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CodeService } from 'src/code/code.service';
import { Code } from 'src/code/entities/code.entity';
import { StatusEnum } from 'src/common/status.enum';
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
    const array = [];
    const code  = await this.codeService.findOne(idCode);
    if (!code) {
      throw new BadRequestException(`codeID: ${code._id} not found`);
    }
    const statusActive = await this.statusService.findByName(StatusEnum.Active);
    for (const idUser of listIdUsers) {
      const user = await this.userService.findOneUser({id: idUser});
      const codeDetail = await this.codeDetailModel.findOne({status: statusActive, user: user, code: code});
      if (codeDetail) {
        array.push(user.email);
      }
    }
    if (array.length === 0) {
      for (const idUser of listIdUsers) {
        const user = await this.userService.findOneUser({id: idUser});
        // const code  = await this.codeService.findOne(idCode);
        const status = await this.statusService.findOne(idStatus);
        const codeDetail =  new this.codeDetailModel({code: code, user: user, status: status});
        await codeDetail.save(); 
      }
    }else{
      throw new BadRequestException(array);
    }
    
    return "create codeDetail successfullly";
  }
  async getCodeDetailUser(idUser: string): Promise<CodeDetail[]>{
    const user = await this.userService.findOneUser({id: idUser});
    const status =await this.statusService.findByName(StatusEnum.Active);
    return await this.codeDetailModel.find({user: user, status: status},{__v: 0, user: 0,status: 0}).populate("code");
  }

  async findAll() : Promise<CodeDetail[]>{
    return await this.codeDetailModel.find({}, {__v: 0}).populate("code").populate("user").populate("status");
  }

  async findOne(id: string) {
    return await this.codeDetailModel.findById(id, {__v: 0}).populate("code").populate("user").populate("status")
  }

  async update(id: string, updateCodeDetailDto: UpdateCodeDetailDto) {
    const {idStatus} = updateCodeDetailDto;
    const status = await this.statusService.findOne(idStatus);
    await this.codeDetailModel.findByIdAndUpdate(id, {status: status});    
    return `Update successfully a ${id} codeDetail status ${status.nameStatus}`;
  }

  remove(id: number) {
    return `This action removes a #${id} codeDetail`;
  }
}
