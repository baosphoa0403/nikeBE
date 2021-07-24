import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { StatusModule } from 'src/status/status.module';
import { Category, CategorySchema } from 'src/category/entities/category.entity';
import { Status, StatusSchema } from 'src/status/entities/status.entity';
import { Color, ColorSchema } from 'src/color/entities/color.entity';
import { Gender, GenderSchema } from 'src/gender/entities/gender.entity';
import { ProductDetail, ProductDetailSchema } from './entities/product-detail.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductDetail.name, schema: ProductDetailSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Status.name, schema: StatusSchema },
      { name: Color.name, schema: ColorSchema },
      { name: Gender.name, schema: GenderSchema },
    ]),
    forwardRef(() => StatusModule),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
