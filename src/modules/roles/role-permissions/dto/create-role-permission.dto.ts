import { IsNotEmpty, IsUUID } from 'class-validator';
/* Utils */
import { IS_REQUIRED, IS_UUID } from '@lib/class-validator/messages-validation';

export class CreateRolePermissionDto {
  @IsUUID('4', { message: IS_UUID('ID del permiso') })
  @IsNotEmpty({ message: IS_REQUIRED('ID del permiso') })
  rp_permission_id: string;

  @IsUUID('4', { message: IS_UUID('ID del menú') })
  @IsNotEmpty({ message: IS_REQUIRED('ID del menú') })
  rp_menu_id: string;

  @IsUUID('4', { message: IS_UUID('ID del rol') })
  @IsNotEmpty({ message: IS_REQUIRED('ID del rol') })
  rp_role_id: string;
}
