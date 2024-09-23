import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
/* Entities */
import { Menu } from '@modules/menu/entities/menu.entity';
import { Permission } from '@modules/roles/permissions/entities/permission.entity';

@Entity({ name: 'role_permission' })
export class RolePermission {
  @PrimaryGeneratedColumn('uuid')
  rp_id: string;

  @Column({ type: 'uuid', nullable: false })
  rp_menu_id: string;

  @Column({ type: 'uuid', nullable: false })
  rp_permission_id: string;

  /* Relationships */
  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'rp_menu_id' })
  menu: Menu; 

  @ManyToOne(() => Permission)
  @JoinColumn({ name: 'rp_permission_id' })
  permission: Permission;
}
