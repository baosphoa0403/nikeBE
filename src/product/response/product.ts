import { Image } from 'src/image/entities/image.entity';
import { ProductDetail } from '../entities/product-detail.entity';
import { Product } from '../entities/product.entity';

class Detail {
  info: ProductDetail;
  images: Image[];
}
export class ProductResponse {
  product: Product;
  details: Detail[];
}
