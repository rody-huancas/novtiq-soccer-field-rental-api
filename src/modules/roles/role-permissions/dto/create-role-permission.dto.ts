import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
/* Utils */
import { IS_REQUIRED, IS_UUID } from '@lib/class-validator/messages-validation';

export class CreateRolePermissionDto {
  @IsUUID('4', { message: IS_UUID('ID del permiso') })
  @IsNotEmpty({ message: IS_REQUIRED('ID del permiso') })
  rp_permission_id: string;

  @IsUUID('4', { message: IS_UUID('ID del menú') })
  @IsOptional()
  me_id?: string;
}
