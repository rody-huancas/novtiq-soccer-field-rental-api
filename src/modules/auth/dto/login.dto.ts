import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
/* Utils */
import { IS_MAX_LENGTH, IS_MIN_LENGTH, IS_REQUIRED, IS_STRING } from '@lib/class-validator/messages-validation';

export class LoginDto {
  @IsString({ message: IS_STRING('Usuario') })
  @IsNotEmpty({ message: IS_REQUIRED('Usuario') })
  username: string;
  
  @IsString({ message: IS_STRING('Contraseña') })
  @IsNotEmpty({ message: IS_REQUIRED('Contraseña') })
  @MinLength(6, { message: IS_MIN_LENGTH('Contraseña', 6) })
  @MaxLength(12, { message: IS_MAX_LENGTH('Contraseña', 12) })
  password: string;
}