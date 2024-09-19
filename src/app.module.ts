import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
/* Librarys */
import { TypeOrmModule } from '@nestjs/typeorm';
/* Lib */
import { typeOrmConfig } from '@lib/type-orm';
/* Middlewares */
import { LoggerMiddleware } from '@middlewares/Logger.middleware';
/* Config */
import { UseEnvironmentVariables } from '@config/env/env.enable';
/* Modules */
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { MenuModule } from './modules/menu/menu.module';
import { RolesModule } from './modules/roles/roles/roles.module';
import { PermissionsModule } from './modules/roles/permissions/permissions.module';
import { RolePermissionsModule } from './modules/roles/role-permissions/role-permissions.module';

@Module({
  imports: [
    // configuración de variables de entorno
    UseEnvironmentVariables,
    UsersModule,
    AuthModule,
    MenuModule,
    RolesModule,
    PermissionsModule,
    RolePermissionsModule,
    // configuración de TypeORM
    //  TypeOrmModule.forRoot(typeOrmConfig),
  ],
  providers: [ Logger ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
