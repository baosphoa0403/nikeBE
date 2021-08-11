import { Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { Color } from 'src/color/entities/color.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { Image } from 'src/image/entities/image.entity';
import { Size } from 'src/size/entities/size.entity';
import { Status } from 'src/status/entities/status.entity';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDetail } from './entities/product-detail.entity';
import { Product } from './entities/product.entity';
import { ProductResponse } from './response/product';
export declare class ProductService {
    private productModel;
    private productDetailModel;
    private categoryModel;
    private statusModel;
    private colorModel;
    private genderModel;
    private sizeModel;
    private imageModel;
    constructor(productModel: Model<Product>, productDetailModel: Model<ProductDetail>, categoryModel: Model<Category>, statusModel: Model<Status>, colorModel: Model<Color>, genderModel: Model<Gender>, sizeModel: Model<Size>, imageModel: Model<Image>);
    findWithFilter(filter: ProductFilterDto): Promise<ProductResponse[]>;
    findStatusWithName(name: string): Promise<Status>;
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
