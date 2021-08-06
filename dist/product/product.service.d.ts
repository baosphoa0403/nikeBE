import { Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDetail } from './entities/product-detail.entity';
import { Product } from './entities/product.entity';
export declare class ProductService {
    private productModel;
    private productDetailModel;
    private categoryModel;
    private statusModel;
    private colorModel;
    private genderModel;
    constructor(productModel: Model<Product>, productDetailModel: Model<ProductDetail>, categoryModel: Model<Category>, statusModel: Model<Category>, colorModel: Model<Category>, genderModel: Model<Category>);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    getAllProduct(): Promise<Product[]>;
    findOne(idProduct: string): Promise<Product>;
    updateProduct(idProduct: string, updateProductDto: UpdateProductDto): Promise<Product>;
    deleteProduct(idProduct: string): Promise<string>;
    insertDetail(idProduct: string, createProductDetailDto: CreateProductDetailDto): Promise<ProductDetail>;
    getAllProductDetail(idProduct: string): Promise<ProductDetail[]>;
    updateProductDetail(idProductDetail: string, updateProductDetailDto: UpdateProductDetailDto): Promise<ProductDetail>;
    deleteProductDetail(idProductDetail: string): Promise<string>;
}
