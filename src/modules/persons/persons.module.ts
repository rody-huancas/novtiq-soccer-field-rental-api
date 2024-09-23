import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* Services */
import { PersonsService } from './persons.service';
/* Controllers */
import { PersonsController } from './persons.controller';
/* Entities */
import { Person } from './entities/person.entity';

@Module({
  controllers: [ PersonsController ],
  imports    : [ TypeOrmModule.forFeature([ Person ]) ],
  providers  : [ PersonsService ],
  exports    : [ TypeOrmModule ],
})
export class PersonsModule {}
