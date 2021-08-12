import { Product } from '../entities/product.entity';
import { ProductDetailResponse } from './product-detail';
export class ProductResponse {
  product: Product;
  details: ProductDetailResponse[];
}
