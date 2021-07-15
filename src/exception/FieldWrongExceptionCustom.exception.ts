import { BadRequestException } from '@nestjs/common';

class FieldWrongExceptionCustom extends BadRequestException {
  constructor(fieldAllow: string[]) {
    const text = fieldAllow.map((item) => {
      return item;
    });
    super(`Must ${text} key wrong`);
  }
}
export default FieldWrongExceptionCustom;
