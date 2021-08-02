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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdProductDto } from './dto/id-product.dto';
import { ProductDetail } from './entities/product-detail.entity';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { IdProductDetailDto } from './dto/id-product-detail.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiResponse({
    status:201,
    description: 'Created successfully product',
    type: Product,
  })
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @Post(':id/productDetail')
  @ApiResponse({
    status:201,
    description: 'Created successfully product detail',
    type: ProductDetail
  })
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
  @ApiResponse({
    status:200,
    description: 'get all Product',
    type: [Product]
  })
  getAllProduct(): Promise<Product[]> {
    return this.productService.getAllProduct();
  }

  @Get(':id/productDetail')
  @ApiResponse({
    status: 200,
    description: 'get all product detail for id product',
    type: [ProductDetail]
  })
  getAllProductDetail(
    @Param() idProductDto: IdProductDto,
  ): Promise<ProductDetail[]> {
    return this.productService.getAllProductDetail(idProductDto.id);
  }

  @Get(':id')
  @ApiResponse({
    status:200,
    description: 'Get a product for id',
    type:Product,
  })
  getProduct(@Param() idProductDto: IdProductDto): Promise<Product> {
    return this.productService.findOne(idProductDto.id);
  }

  @Patch(':id')
  @ApiResponse({
    status:200,
    description: 'Update a product for id',
    type: Product,
  })
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
  @ApiResponse({
    status:200,
    description: 'Update a product detail for id productDetail',
    type: ProductDetail,
  })
  updateProductDetail(
    @Param() idProductDetailDto: IdProductDetailDto,
    @Body() updateProductDetailDto: UpdateProductDetailDto
    ):Promise<ProductDetail> {
    return this.productService.updateProductDetail(idProductDetailDto.id, updateProductDetailDto);
  }

  @Delete(':id')
  @ApiResponse({
    status:200,
    description: 'Delete a product for id Product',
    type: String,
  })
  deleteProduct(@Param() idProductDto: IdProductDto): Promise<string> {
    return this.productService.deleteProduct(idProductDto.id);
  }

  @Delete('productDetail/:id')
  @ApiResponse({
    status:200,
    description: 'Delete a product detail for id ProductDetail',
    type: String,
  })
  deleteProductDetail(@Param() idProductDetailDto: IdProductDetailDto): Promise<string> {
    return this.productService.deleteProductDetail(idProductDetailDto.id);
  }
}
