import { Image } from 'src/image/entities/image.entity';
import { ProductDetail } from '../entities/product-detail.entity';
import { Quantity } from '../entities/quantity.entity';

export class ProductDetailResponse {
  info: ProductDetail;
  quantities: Quantity[];
  images: Image[];
}
