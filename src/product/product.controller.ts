import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ApiTags } from '@nestjs/swagger';
import { IdProductDto } from './dto/id-product.dto';
import { ProductDetail } from './entities/product-detail.entity';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { IdProductDetailDto } from './dto/id-product-detail.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @Post(':id/productDetail')
  insertProductDetail(
    @Param() idProductDto: IdProductDto,
    @Body() updateProductDetailDto: UpdateProductDetailDto,
  ): Promise<ProductDetail> {
    return this.productService.insertDetail(
      idProductDto.id,
      updateProductDetailDto,
    );
  }

  @Get()
  getAllProduct(): Promise<Product[]> {
    return this.productService.getAllProduct();
  }

  @Get(':id/productDetail')
  getAllProductDetail(
    @Param() idProductDto: IdProductDto,
  ): Promise<ProductDetail[]> {
    return this.productService.getAllProductDetail(idProductDto.id);
  }

  @Get(':id')
  getProduct(@Param() idProductDto: IdProductDto): Promise<Product> {
    return this.productService.findOne(idProductDto.id);
  }

  @Patch(':id')
  updateProduct(
    @Param() idProoductDto: IdProductDto,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(
      idProoductDto.id,
      updateProductDto,
    );
  }

  @Patch('productDetail/:id')
  updateProductDetail(
    @Param() idProductDetailDto: IdProductDetailDto,
    @Body() updateProductDetailDto: UpdateProductDetailDto
    ):Promise<ProductDetail> {
    return this.productService.updateProductDetail(idProductDetailDto.id, updateProductDetailDto);
  }

  @Delete(':id')
  deleteProduct(@Param() idProductDto: IdProductDto): Promise<string> {
    return this.productService.deleteProduct(idProductDto.id);
  }

  @Delete('productDetail/:id')
  deleteProductDetail(@Param() idProductDetailDto: IdProductDetailDto): Promise<string> {
    return this.productService.deleteProductDetail(idProductDetailDto.id);
  }
}
