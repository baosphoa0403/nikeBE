import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './entities/image.entity';
import { Image } from './entities/image.entity';
import {
  ProductDetail,
  ProductDetailSchema,
} from 'src/product/entities/product-detail.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Image.name, schema: ImageSchema },
      { name: ProductDetail.name, schema: ProductDetailSchema },
    ]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
