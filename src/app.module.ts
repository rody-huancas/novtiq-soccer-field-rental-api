import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
/* Librarys */
import { TypeOrmModule } from '@nestjs/typeorm';
/* Middlewares */
import { LoggerMiddleware } from '@middlewares/Logger.middleware';
/* Config */
import { UseEnvironmentVariables } from '@config/env/env.enable';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_SSL, DB_USERNAME } from '@config/env';
/* Modules */
import { appModules } from './app-modules';

@Module({
  imports: [
    // configuración de variables de entorno
    UseEnvironmentVariables,
    // configuración de TypeORM
    TypeOrmModule.forRoot({
      type            : 'postgres',
      host            : DB_HOST,
      port            : +DB_PORT,
      database        : DB_NAME,
      username        : DB_USERNAME,
      password        : DB_PASSWORD,
      autoLoadEntities: true,
      synchronize     : true,
      ssl             : DB_SSL
    }),
    /* Modules */
    ...appModules,
  ],
  providers: [ Logger ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
