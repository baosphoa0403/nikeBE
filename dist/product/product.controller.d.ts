import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { IdProductDto } from './dto/id-product.dto';
import { ProductDetail } from './entities/product-detail.entity';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { IdProductDetailDto } from './dto/id-product-detail.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    insertProductDetail(idProductDto: IdProductDto, updateProductDetailDto: UpdateProductDetailDto): Promise<ProductDetail>;
    getAllProduct(): Promise<Product[]>;
    getAllProductDetail(idProductDto: IdProductDto): Promise<ProductDetail[]>;
    getProduct(idProductDto: IdProductDto): Promise<Product>;
    updateProduct(idProoductDto: IdProductDto, updateProductDto: UpdateProductDto): Promise<Product>;
    updateProductDetail(idProductDetailDto: IdProductDetailDto, updateProductDetailDto: UpdateProductDetailDto): Promise<ProductDetail>;
    deleteProduct(idProductDto: IdProductDto): Promise<string>;
    deleteProductDetail(idProductDetailDto: IdProductDetailDto): Promise<string>;
}
