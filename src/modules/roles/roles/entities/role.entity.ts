import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  ro_id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  ro_name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  ro_description: string;
}
