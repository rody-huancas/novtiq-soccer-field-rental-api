import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateUUIDFormatPipe implements PipeTransform<string, string> {
  transform( value: string ): string {
    if (!value.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-4][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/)) {
      throw new BadRequestException('El formato del ID es inválido');
    }
    return value;
  }

  exceptionFactory() {
    return new BadRequestException('El ID proporcionado no tiene el formato correcto de UUID');
  }
}