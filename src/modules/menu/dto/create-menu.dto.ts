import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
/* Utils */
import { validationMessages } from '@utils/messages-validations.util';

export class CreateMenuDto {
  @IsString({ message: validationMessages.string('nombre del menú') })
  @IsNotEmpty({ message: validationMessages.required('nombre del menú') })
  me_name: string;

  @IsString({ message: validationMessages.string('descripción del menú') })
  @IsOptional()
  me_description: string;

  @IsString({ message: validationMessages.string('URL del menú') })
  @IsNotEmpty({ message: validationMessages.required('URL del menú') })
  me_url: string;

  @IsString({ message: validationMessages.string('icono del menú') })
  @IsNotEmpty({ message: validationMessages.required('icono del menú') })
  me_icon: string;

  @IsBoolean({ message: validationMessages.boolean('estado del menú') })
  @IsNotEmpty({ message: validationMessages.required('estado del menú') })
  me_isActive: boolean;
}
