import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/* Entities */
import { Menu } from './entities/menu.entity';
/* Services */
import { MenuService } from './menu.service';
/* Controllers */
import { MenuController } from './menu.controller';

@Module({
  controllers: [ MenuController ],
  imports    : [ TypeOrmModule.forFeature([Menu]) ],
  providers  : [ MenuService ],
  exports    : [ TypeOrmModule ],
})
export class MenuModule {}
