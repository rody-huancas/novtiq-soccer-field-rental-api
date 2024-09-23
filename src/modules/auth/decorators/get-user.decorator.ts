import { ExecutionContext, createParamDecorator, InternalServerErrorException } from '@nestjs/common';

/**
 * Decorador personalizado para acceder al objeto del usuario desde el contexto de ejecución.
 * @param data Clave opcional para acceder a una propiedad específica del objeto del usuario.
 * @param ctx Contexto de ejecución de Nest.js.
 * @returns Objeto del usuario o propiedad específica del usuario si se proporciona 'data'.
 * @throws InternalServerErrorException Si no se encuentra el usuario en el contexto de ejecución.
 */
export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user) throw new InternalServerErrorException('Usuario no encontrado');
    
    return !data ? user : user[data];
  },
);