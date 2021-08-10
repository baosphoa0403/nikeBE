import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDetail } from 'src/product/entities/product-detail.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<Image>,
    @InjectModel(ProductDetail.name)
    private productDetailModel: Model<ProductDetail>,
  ) {}
  async create(createImageDto: CreateImageDto) {
    const image = new this.imageModel(createImageDto);
    return await image.save();
  }

  async findAll() {
    return await this.imageModel.find({}, { __v: 0 });
  }

  async findOne(id: string) {
    return await this.imageModel.findById(id, { __v: 0 });
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    const image = await this.findOne(id);
    if (!image) {
      throw new BadRequestException('image not found');
    }
    const productDetail = await this.productDetailModel.findById(
      updateImageDto.idShoesDetail,
    );
    if (!productDetail) {
      throw new BadRequestException('product not found');
    }
    image.urlImage = updateImageDto.urlImage;
    image.idShoesDetail = productDetail._id;
    return await image.save();
  }

  async remove(id: string) {
    const image = await this.imageModel.findById(id);
    if (!image) {
      throw new BadRequestException('image not foung');
    }
    await image.remove();
    return 'delete successfull ' + id;
  }
}
