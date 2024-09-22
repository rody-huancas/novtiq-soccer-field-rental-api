import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
/* Utils */
import { IS_BOOLEAN, IS_REQUIRED, IS_STRING } from '@lib/class-validator/messages-validation';

export class CreateMenuDto {
  @IsString({ message: IS_STRING('Nombre') })
  @IsNotEmpty({ message: IS_REQUIRED('Nombre') })
  me_name: string;

  @IsString({ message: IS_STRING('Descripción') })
  @IsOptional()
  me_description: string;

  @IsString({ message: IS_STRING('URL') })
  @IsOptional()
  me_url: string;

  @IsString({ message: IS_STRING('Icono') })
  @IsNotEmpty({ message: IS_REQUIRED('Icono') })
  me_icon: string;

  @IsBoolean({ message: IS_BOOLEAN('Estado') })
  @IsOptional()
  me_isActive: boolean;
}
