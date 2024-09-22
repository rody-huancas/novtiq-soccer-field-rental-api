import { HttpException, HttpStatus } from "@nestjs/common";
import { Repository, FindOptionsWhere } from "typeorm";

/**
 * Valida la existencia de una entidad en la base de datos.
 * 
 * @param repository - El repositorio de TypeORM para la entidad.
 * @param id - El ID de la entidad a buscar.
 * @param field - El campo de la entidad que se usará para la búsqueda.
 * @param entityName - El nombre de la entidad para el mensaje de error.
 * @throws {HttpException} - Si la entidad no existe.
 */
const validateExistence = async <T>(repository: Repository<T>, id: string, field: keyof T, entityName: string): Promise<T> => {
  const where: FindOptionsWhere<T> = { [field]: id } as FindOptionsWhere<T>;
  const entity = await repository.findOne({ where });
  if (!entity) {
    throw new HttpException(`El ${entityName} con id '${id}' no existe.`, HttpStatus.NOT_FOUND);
  }
  
  return entity;
};

export default validateExistence;