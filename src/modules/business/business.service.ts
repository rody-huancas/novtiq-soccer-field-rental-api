import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
/* DTOs */
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
/* Entities */
import { Business } from './entities/business.entity';
/* Utils */
import { ActionType } from '@utils/functions/types';
import { createActionMessage } from '@utils/functions';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business) private readonly businessRepository: Repository<Business>,
    private dataSource: DataSource
  ) {}

  async createOrUpdate(createBusinessDto: CreateBusinessDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingBusiness = await this.businessRepository.findOne({});

      if (existingBusiness) {
        const updatedBusiness = await queryRunner.manager.save(Business, {
          ...existingBusiness,
          ...createBusinessDto
        });
        await queryRunner.commitTransaction();
        return createActionMessage('negocio', updatedBusiness.bu_name, ActionType.Update);
      } else {
        const newBusiness = queryRunner.manager.create(Business, createBusinessDto);
        await queryRunner.manager.save(newBusiness);
        await queryRunner.commitTransaction();
        return createActionMessage('negocio', newBusiness.bu_name, ActionType.Create);
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async findBusiness() {
    const business = await this.businessRepository.findOne({});
    if (!business) {
      throw new HttpException('No se encontró información del negocio', HttpStatus.NOT_FOUND);
    }
    return business;
  }

  async updateBusiness(updateBusinessDto: UpdateBusinessDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingBusiness = await this.findBusiness();

      const updatedBusiness = await queryRunner.manager.save(Business, { ...existingBusiness, ...updateBusinessDto });

      await queryRunner.commitTransaction();
      return createActionMessage('negocio', updatedBusiness.bu_name, ActionType.Update);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async removeBusiness() {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingBusiness = await this.findBusiness();

      await queryRunner.manager.remove(existingBusiness);
      await queryRunner.commitTransaction();

      return createActionMessage('negocio', existingBusiness.bu_name, ActionType.Delete);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }
}