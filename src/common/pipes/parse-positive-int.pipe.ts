import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ParsePositiveIntPipe implements PipeTransform<string, number> {
  transform(value: string) {
    const parsedInt = parseInt(value, 10);

    if (isNaN(parsedInt) || parsedInt < 1) {
      throw new BadRequestException('Validation failed (positive integer string is expected)');
    }

    return parsedInt;
  }
}
