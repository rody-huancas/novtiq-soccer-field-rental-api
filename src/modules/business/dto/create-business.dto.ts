import { IsString, IsOptional, IsEmail, IsUrl, IsNotEmpty } from 'class-validator';
/* Utils */
import { IS_EMAIL, IS_REQUIRED, IS_STRING, IS_URL } from '@lib/class-validator/messages-validation';

export class CreateBusinessDto {
  @IsString({ message: IS_STRING('Nombre') })
  @IsNotEmpty({ message: IS_REQUIRED('Nombre') })
  bu_name: string;

  @IsOptional()
  @IsString({ message: IS_STRING('Descripción') })
  bu_description?: string;

  @IsOptional()
  @IsString({ message: IS_STRING('Logo') })
  bu_logo?: string;

  @IsOptional()
  @IsString({ message: IS_STRING('Teléfono') })
  bu_phone?: string;

  @IsOptional()
  @IsEmail({}, { message: IS_EMAIL('Correo electrónico') })
  bu_email?: string;

  @IsOptional()
  @IsString({ message: IS_STRING('Dirección') })
  bu_address?: string;

  @IsOptional()
  @IsString({ message: IS_STRING('Ciudad') })
  bu_city?: string;

  @IsOptional()
  @IsString({ message: IS_STRING('País') })
  bu_country?: string;

  @IsOptional()
  @IsUrl({}, { message: IS_URL('URL') })
  bu_website?: string;
}
