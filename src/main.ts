import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { corstOptions } from '@config/cors';
import { PORT, PUBLIC_URL } from '@config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Habilitar cors
  app.enableCors(corstOptions);

  // Configurar el uso de un contenedor especial en las validaciones 
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Configurar un tubo global para la validación de datos entrantes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Filtrar propiedades no definidas en DTOs
      forbidNonWhitelisted: true, // Rechazar solicitudes con propiedades no definidas en DTOs
    }),
  );

  // Usar prefijo global 'api', todas las llamadas vendrán después de '/api/v1*'
  app.setGlobalPrefix('api/v1');

  await app.listen(PORT, () => {
    logger.log(`[INFO] El servidor se ha iniciado en '${PUBLIC_URL}:${PORT}'`);
  });
}
bootstrap();