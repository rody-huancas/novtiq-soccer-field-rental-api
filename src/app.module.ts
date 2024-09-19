import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from '@lib/type-orm';
import { UseEnvironmentVariables } from '@config/env/env.enable';

@Module({
  imports: [
     // configuración de variables de entorno
     UseEnvironmentVariables,
     // configuración de TypeORM
    //  TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}
