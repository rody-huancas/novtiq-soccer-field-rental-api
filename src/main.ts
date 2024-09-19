import { Reflector } from '@nestjs/core';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
/* Libraries */
import { useContainer } from 'class-validator';
/* Modules */
import { AppModule } from './app.module';
/* Configs */
import { corstOptions } from '@config/cors';
import { PORT, PUBLIC_URL } from '@config/env';
/* Interceptors */
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Habilitar cors
  app.enableCors(corstOptions);

  // Configurar el uso de un contenedor especial en las validaciones 
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Configurar un tubo global para la validación de datos entrantes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // Usar prefijo global 'api', todas las llamadas vendrán después de '/api/v1*'
  app.setGlobalPrefix('api/v1');

  // Añadir el ResponseInterceptor global
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));

  // Iniciar el servidor
  await app.listen(PORT, () => {
    logger.log(`[INFO] El servidor se ha iniciado en '${PUBLIC_URL}:${PORT}'`);
  });
}
bootstrap();