import { ProductDetail } from '../entities/product-detail.entity';
import { Product } from '../entities/product.entity';

export class ProductResponse {
  product: Product;
  details: ProductDetail[];
}
