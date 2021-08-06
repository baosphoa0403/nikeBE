import { Color } from "src/color/entities/color.entity";
import { Gender } from "src/gender/entities/gender.entity";
import { Product } from "src/product/entities/product.entity";
import { Status } from "src/status/entities/status.entity";
export declare class ProductDetail {
    product: Product;
    status: Status;
    color: Color;
    price: number;
    gender: Gender;
    quantity: number;
}
