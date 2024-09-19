import { TypeOrmModuleOptions } from '@nestjs/typeorm';
/* Config */
import { ENVIRONMENT, PORT } from '@config/env';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type            : 'postgres',
  host            : '',
  port            : +PORT,
  database        : '',
  username        : '',
  password        : '',
  autoLoadEntities: ENVIRONMENT === 'dev', // cargar automáticamente las entidades
  synchronize     : ENVIRONMENT === 'dev', // sincronizar cambios del entity (solo para desarrollo)
  ssl             : ENVIRONMENT !== 'dev',
};
