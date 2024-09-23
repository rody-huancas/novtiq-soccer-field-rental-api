import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
/* DTOs */
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
/* Entities */
import { Person } from './entities/person.entity';
/* Utils */
import { checkExistence } from '@utils/checkExistence';
import { validateExistence } from '@utils/validateExistence';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person) private readonly personRepository: Repository<Person>,
    private dataSource: DataSource
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { per_document_number, ...data } = createPersonDto;

      /* Verificar si el número de documento ya existe */
      await checkExistence(this.personRepository, 'per_document_number', per_document_number);

      const person = this.personRepository.create({ per_document_number, ...data });

      await queryRunner.manager.save(person);
      await queryRunner.commitTransaction();

      return { message: `La persona '${person.per_full_name}' ha sido creada correctamente.` };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      const persons = await this.personRepository.find();
      return persons;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const person = await validateExistence(this.personRepository, id, 'per_id', 'Persona');
      return person;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const person = await this.findOne(id);
      
      const { per_document_number, ...data } = updatePersonDto;

      if (per_document_number !== person.per_document_number) await checkExistence(this.personRepository, 'per_document_number', per_document_number);
      
      const personUpdated = await this.personRepository.preload({ per_id: id, ...data, per_document_number});

      await queryRunner.manager.save(personUpdated);
      await queryRunner.commitTransaction();

      return { message: `La persona '${personUpdated.per_full_name}' ha sido actualizada correctamente.` };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const person = await this.findOne(id);
      
      await this.personRepository.remove(person);
      await queryRunner.commitTransaction();

      return { message: `La persona '${person.per_full_name}' ha sido eliminada correctamente.` };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }
}
