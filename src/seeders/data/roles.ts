import { RoleType } from '../types';

export const rolesData: RoleType[] = [
  {
    ro_name: 'Administrador',
    ro_description: 'Rol con todos los permisos del sistema',
  },
  {
    ro_name: 'Usuario',
    ro_description: 'Rol con permisos básicos para usar el sistema',
  },
  {
    ro_name: 'Invitado',
    ro_description: 'Rol con permisos limitados para ver contenido público',
  },
];
