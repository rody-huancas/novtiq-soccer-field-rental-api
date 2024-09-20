import { Reflector } from '@nestjs/core';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
/* Libraries */
import { useContainer } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
/* Modules */
import { AppModule } from './app.module';
/* Package */
import pkg from '@root/package.json';
/* Configs */
import { corstOptions } from '@config/cors';
import { APP_NAME, PORT, PUBLIC_URL } from '@config/env';
/* Interceptors */
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar cors
  app.enableCors(corstOptions);

  // Configurar el uso de un contenedor especial en las validaciones 
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

   // Usar validación de 'pipe' para validar la estructura del 'body'
   app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true }
    })
  )

  // Crear documentación de la API
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(`API | ${APP_NAME}`)
    .setContact(pkg.author.name, pkg.author.url, pkg.author.email)
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)

  // Usar prefijo global 'api', todas las llamadas vendrán después de '/api/v1*'
  app.setGlobalPrefix('api/v1');

  // Añadir el ResponseInterceptor global
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));

  // Escuchar la aplicación en el PUERTO definido en las variables de entorno
  await app.listen(PORT || 0, () => {
    console.log(
      '\x1b[33m%s\x1b[0m',
      `[INFO] El servidor se ha iniciado en '${PUBLIC_URL}:${PORT}'`
    )
  })

}
bootstrap();