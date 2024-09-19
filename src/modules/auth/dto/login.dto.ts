import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString({ message: "El usuario debe ser una cadena de caracteres" })
  @IsNotEmpty({ message: "El usuario es requerido" })
  username: string;
  
  @IsString({ message: "La contraseña debe ser una cadena de caracteres" })
  @IsNotEmpty({ message: "La contraseña es requerida" })
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  @MaxLength(12, { message: "La contraseña debe tener máximo 12 caracteres" })
  password: string;
}