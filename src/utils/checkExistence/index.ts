import { ConflictException } from '@nestjs/common';
/* Libraries */
import { Repository } from 'typeorm';

/**
 * Verifica la existencia de un registro en el repositorio dado.
 * 
 * @param repository - El repositorio en el que se realizará la búsqueda.
 * @param field - El campo por el cual se buscará el registro.
 * @param value - El valor a buscar en el campo especificado.
 * @param strict - Indica si la búsqueda debe ser estricta (sensible a mayúsculas y minúsculas). Por defecto es true.
 * @throws {ConflictException} Si se encuentra un registro existente.
 * @returns {Promise<void>}
 */
export async function checkExistence<T>(repository: Repository<T>, field: string, value: string, strict: boolean = true): Promise<void> {
  let existingRecord: T | null;

  if (strict) {
    existingRecord = await repository.findOne({ where: { [field]: value } as any });
  } else {
    existingRecord = await repository
      .createQueryBuilder()
      .where(`LOWER(${field}) = LOWER(:value)`, { value })
      .getOne();
  }

  if (existingRecord) {
    throw new ConflictException(`El campo ${field} ya existe.`);
  }
}
