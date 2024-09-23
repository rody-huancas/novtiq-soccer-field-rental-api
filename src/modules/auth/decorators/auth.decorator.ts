import { AuthGuard } from '@nestjs/passport';
import { UseGuards, applyDecorators } from '@nestjs/common';

/**
 * Decorador que aplica el guard de autenticación a un controlador o un método de controlador.
 * Este decorador se utiliza para proteger las rutas que requieren autenticación.
 * @returns Un decorador aplicado que usa AuthGuard para proteger las rutas.
 */
export function Auth() {
  return applyDecorators(
    UseGuards(AuthGuard())
  );
}