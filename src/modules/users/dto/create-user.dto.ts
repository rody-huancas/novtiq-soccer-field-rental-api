import { IsString, IsNotEmpty, IsBoolean, IsUUID, IsEmail, IsOptional, IsDate } from 'class-validator';
/* Utils */
import { IS_BOOLEAN, IS_REQUIRED, IS_STRING, IS_UUID, IS_EMAIL, IS_DATE } from '@lib/class-validator/messages-validation';

export class CreateUserDto {
  @IsString({ message: IS_STRING('Nombre') })
  @IsNotEmpty({ message: IS_REQUIRED('Nombre') })
  us_name: string;

  @IsString({ message: IS_STRING('Apellido') })
  @IsNotEmpty({ message: IS_REQUIRED('Apellido') })
  us_lastname: string;

  @IsString({ message: IS_STRING('Nombre completo') })
  @IsNotEmpty({ message: IS_REQUIRED('Nombre completo') })
  us_fullname: string;

  @IsString({ message: IS_STRING('Tipo de documento') })
  @IsNotEmpty({ message: IS_REQUIRED('Tipo de documento') })
  us_document_type: string;

  @IsString({ message: IS_STRING('Número de documento') })
  @IsNotEmpty({ message: IS_REQUIRED('Número de documento') })
  us_document_number: string;

  @IsEmail({}, { message: IS_EMAIL('Correo electrónico') })
  @IsNotEmpty({ message: IS_REQUIRED('Correo electrónico') })
  us_email: string;

  @IsString({ message: IS_STRING('Teléfono') })
  @IsOptional()
  us_phone?: string;

  @IsString({ message: IS_STRING('Género') })
  @IsOptional()
  us_gender?: string;

  @IsString({ message: IS_STRING('URL de avatar') })
  @IsOptional()
  us_avatar_url?: string;

  @IsDate({ message: IS_DATE('Fecha de nacimiento') })
  @IsOptional()
  us_date_of_birth?: Date;

  @IsString({ message: IS_STRING('Dirección') })
  @IsOptional()
  us_address?: string;

  @IsString({ message: IS_STRING('País') })
  @IsOptional()
  us_country?: string;

  @IsString({ message: IS_STRING('Ciudad') })
  @IsOptional()
  us_city?: string;

  @IsString({ message: IS_STRING('Nombre de usuario') })
  @IsNotEmpty({ message: IS_REQUIRED('Nombre de usuario') })
  us_username: string;

  @IsString({ message: IS_STRING('Contraseña') })
  @IsNotEmpty({ message: IS_REQUIRED('Contraseña') })
  us_password: string;

  @IsBoolean({ message: IS_BOOLEAN('Estado') })
  @IsNotEmpty({ message: IS_REQUIRED('Estado') })
  us_status: boolean;

  @IsUUID('4', { message: IS_UUID('Rol') })
  @IsNotEmpty({ message: IS_REQUIRED('Rol') })
  us_role_id: string;
}
