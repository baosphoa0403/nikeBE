import { CreateGenderDto } from './create-gender.dto';
declare const UpdateGenderDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateGenderDto>>;
export declare class UpdateGenderDto extends UpdateGenderDto_base {
    nameGender: string;
}
export {};
