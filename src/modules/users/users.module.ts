import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* Entities */
import { User } from './entities/user.entity';
/* Modules */
import { RolesModule } from '@modules/roles/roles/roles.module';
/* Services */
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [ UsersController ],
  imports    : [
    TypeOrmModule.forFeature([ User ]),
    RolesModule,
  ],
  providers  : [ UsersService ],
  exports    : [ TypeOrmModule ],
})
export class UsersModule {}
