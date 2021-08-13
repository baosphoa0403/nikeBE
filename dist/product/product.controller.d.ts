import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { IdProductDto } from './dto/id-product.dto';
import { IdProductDetailDto } from './dto/id-product-detail.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { ProductDetailResponse } from './response/product-detail';
import { CreateUpdateProductDetailDto } from './dto/create-update-product-detail.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    filter(filter: ProductFilterDto): Promise<import("./response/product").ProductResponse[]>;
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    insertProductDetail(idProductDto: IdProductDto, createProductDetailDto: CreateUpdateProductDetailDto): Promise<ProductDetailResponse>;
    getAllProduct(): Promise<Product[]>;
    getAllProductDetail(idProductDto: IdProductDto): Promise<ProductDetailResponse[]>;
    getProduct(idProductDto: IdProductDto): Promise<Product>;
    updateProduct(idProoductDto: IdProductDto, updateProductDto: UpdateProductDto): Promise<Product>;
    updateProductDetail(idProductDetailDto: IdProductDetailDto, updateProductDetailDto: CreateUpdateProductDetailDto): Promise<ProductDetailResponse>;
    deleteProduct(idProductDto: IdProductDto): Promise<string>;
    deleteProductDetail(idProductDetailDto: IdProductDetailDto): Promise<string>;
}
