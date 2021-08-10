import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ProductDetail } from 'src/product/entities/product-detail.entity';
export type ImageDocument = Image & Document;
@Schema()
export class Image {
    @Prop()
    urlImage: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductDetail' })
    idShoesDetail: ProductDetail
}
export const ImageSchema = SchemaFactory.createForClass(Image);
