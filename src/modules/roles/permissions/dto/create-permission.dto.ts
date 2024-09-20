import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
/* Utils */
import { IS_MAX_LENGTH, IS_REQUIRED, IS_STRING } from '@lib/class-validator/messages-validation';

export class CreatePermissionDto {
  @IsString({ message: IS_STRING('Nombre') })
  @IsNotEmpty({ message: IS_REQUIRED('Nombre') })
  @MaxLength(100, { message: IS_MAX_LENGTH('Nombre', 100) })
  pe_name: string;

  @IsString({ message: IS_STRING('Descripción') })
  @IsOptional()
  @MaxLength(255, { message: IS_MAX_LENGTH('Descripción', 255) })
  pe_description: string;
}
