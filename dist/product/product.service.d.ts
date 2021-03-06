import { Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { Color } from 'src/color/entities/color.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { Image } from 'src/image/entities/image.entity';
import { ImageService } from 'src/image/image.service';
import { Size } from 'src/size/entities/size.entity';
import { Status } from 'src/status/entities/status.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateUpdateProductDetailDto } from './dto/create-update-product-detail.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDetail } from './entities/product-detail.entity';
import { Product } from './entities/product.entity';
import { Quantity } from './entities/quantity.entity';
import { ProductResponse } from './response/product';
import { ProductDetailResponse } from './response/product-detail';
export declare class ProductService {
    private productModel;
    private productDetailModel;
    private categoryModel;
    private statusModel;
    private colorModel;
    private genderModel;
    private sizeModel;
    private imageModel;
    private imageService;
    private quantityModel;
    constructor(productModel: Model<Product>, productDetailModel: Model<ProductDetail>, categoryModel: Model<Category>, statusModel: Model<Status>, colorModel: Model<Color>, genderModel: Model<Gender>, sizeModel: Model<Size>, imageModel: Model<Image>, imageService: ImageService, quantityModel: Model<Quantity>);
    findStatusWithName(name: string): Promise<Status>;
    findWithFilter(filter: ProductFilterDto): Promise<ProductResponse[]>;
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    getAllProduct(): Promise<Product[]>;
    findOne(idProduct: string): Promise<Product>;
    updateProduct(idProduct: string, updateProductDto: UpdateProductDto): Promise<Product>;
    deleteProduct(idProduct: string): Promise<string>;
    insertDetail(idProduct: string, createProductDetailDto: CreateUpdateProductDetailDto): Promise<ProductDetailResponse>;
    getAllProductDetail(idProduct: string): Promise<ProductDetailResponse[]>;
    updateProductDetail(idProductDetail: string, updateProductDetailDto: CreateUpdateProductDetailDto): Promise<ProductDetailResponse>;
    deleteProductDetail(idProductDetail: string): Promise<string>;
}
