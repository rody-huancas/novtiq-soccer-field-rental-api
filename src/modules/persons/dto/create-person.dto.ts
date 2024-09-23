import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
/* Utils */
import { IS_EMAIL, IS_REQUIRED, IS_STRING } from '@lib/class-validator/messages-validation';

export class CreatePersonDto {
  @IsString({ message: IS_STRING('Nombre') })
  @IsNotEmpty({ message: IS_REQUIRED('Nombre') })
  per_name: string;

  @IsString({ message: IS_STRING('Apellido') })
  @IsNotEmpty({ message: IS_REQUIRED('Apellido') })
  per_last_name: string;

  @IsString({ message: IS_STRING('Nombre completo') })
  @IsOptional()
  per_full_name: string;

  @IsString({ message: IS_STRING('Tipo de documento') })
  @IsNotEmpty({ message: IS_REQUIRED('Tipo de documento') })
  per_document_type: string;

  @IsString({ message: IS_STRING('Número de documento') })
  @IsNotEmpty({ message: IS_REQUIRED('Número de documento') })
  per_document_number: string;

  @IsString({ message: IS_STRING('Correo electrónico') })
  @IsEmail({},{ message: IS_EMAIL('Correo electrónico') })
  @IsOptional()
  per_email: string;

  @IsString({ message: IS_STRING('Teléfono') })
  @IsOptional()
  per_phone: string;

  @IsString({ message: IS_STRING('Dirección') })
  @IsOptional()
  per_address: string;

  @IsString({ message: IS_STRING('Ciudad') })
  @IsOptional()
  per_city: string;

  @IsString({ message: IS_STRING('País') })
  @IsOptional()
  per_country: string;
}
