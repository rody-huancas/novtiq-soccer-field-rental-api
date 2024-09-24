import { AuthModule } from '@modules/auth/auth.module';
import { MenuModule } from '@modules/menu/menu.module';
import { UsersModule } from '@modules/users/users.module';
import { RolesModule } from '@modules/roles/roles/roles.module';
import { SeedersModule } from '@seeders/seeders.module';
import { BusinessModule } from '@modules/business/business.module';
import { PermissionsModule } from '@modules/roles/permissions/permissions.module';
import { RolePermissionsModule } from '@modules/roles/role-permissions/role-permissions.module';

export const appModules = [
  AuthModule,
  MenuModule,
  UsersModule,
  RolesModule,
  PermissionsModule,
  RolePermissionsModule,
  SeedersModule,
  BusinessModule,
];
