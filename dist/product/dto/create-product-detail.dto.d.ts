declare class Quantity {
    quantity: number;
    sizeId: string;
    price: number;
}
export declare class CreateProductDetailDto {
    statusId: string;
    colorId: string;
    genderId: string;
    quantities: Quantity[];
    imageUrls: string[];
}
export {};
