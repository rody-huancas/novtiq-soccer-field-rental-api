import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
/* Utils */
import { IS_STRING, IS_REQUIRED, IS_MAX_LENGTH } from '@lib/class-validator/messages-validation';

export class CreateRoleDto {
  @IsString({ message: IS_STRING('Nombre') })
  @IsNotEmpty({ message: IS_REQUIRED('Nombre') })
  @MaxLength(50, { message: IS_MAX_LENGTH('Nombre', 50) })
  ro_name: string;

  @IsOptional()
  @IsString({ message: IS_STRING('Descripción') })
  @MaxLength(100, { message: IS_MAX_LENGTH('Descripción', 100) })
  ro_description: string;
}
