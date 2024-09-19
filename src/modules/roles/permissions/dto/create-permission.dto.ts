import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
/* Utils */
import { validationMessages } from '@utils/messages-validations.util';

export class CreatePermissionDto {
  @IsString({ message: validationMessages.string('nombre del permiso') })
  @IsNotEmpty({ message: validationMessages.required('nombre del permiso') })
  @MaxLength(100)
  pe_name: string;

  @IsString({ message: validationMessages.string('descripción del permiso') })
  @IsOptional()
  @MaxLength(255)
  pe_description: string;
}
