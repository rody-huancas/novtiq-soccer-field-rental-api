import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
/* Librarys */
import { TypeOrmModule } from '@nestjs/typeorm';
/* Lib */
import { typeOrmConfig } from '@lib/type-orm';
/* Middlewares */
import { LoggerMiddleware } from '@middlewares/Logger.middleware';
/* Config */
import { UseEnvironmentVariables } from '@config/env/env.enable';

@Module({
  imports: [
    // configuración de variables de entorno
    UseEnvironmentVariables,
    // configuración de TypeORM
    //  TypeOrmModule.forRoot(typeOrmConfig),
  ],
  providers: [Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
