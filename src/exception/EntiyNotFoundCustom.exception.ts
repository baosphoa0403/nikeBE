import { NotFoundException } from '@nestjs/common';

class EntiyNotFoundCustom extends NotFoundException {
  constructor(stringID: string, className: string) {
    super(`className ${className} && id ${stringID} not found`);
  }
}
export default EntiyNotFoundCustom;
