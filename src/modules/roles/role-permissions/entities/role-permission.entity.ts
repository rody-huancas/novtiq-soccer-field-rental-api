import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
/* Entities */
import { Menu } from '@modules/menu/entities/menu.entity';
import { Permission } from '@modules/roles/permissions/entities/permission.entity';

@Entity({ name: 'role_permission' })
export class RolePermission {
  @PrimaryGeneratedColumn('uuid')
  rp_id: string;

  @Column({ type: 'uuid', nullable: false })
  rp_role_id: string;

  @Column({ type: 'uuid', nullable: false })
  rp_permission_id: string;

  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'me_id' })
  menu: Menu; 

  @ManyToOne(() => Permission)
  @JoinColumn({ name: 'pe_id' })
  permission: Permission;
}
