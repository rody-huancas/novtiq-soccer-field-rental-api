import { AuthModule } from '@modules/auth/auth.module';
import { MenuModule } from '@modules/menu/menu.module';
import { UsersModule } from '@modules/users/users.module';
import { RolesModule } from '@modules/roles/roles/roles.module';
import { PersonsModule } from '@modules/persons/persons.module';
import { PermissionsModule } from '@modules/roles/permissions/permissions.module';
import { RolePermissionsModule } from '@modules/roles/role-permissions/role-permissions.module';

export const appModules = [
  AuthModule,
  MenuModule,
  UsersModule,
  RolesModule,
  PermissionsModule,
  RolePermissionsModule,
  PersonsModule
];
