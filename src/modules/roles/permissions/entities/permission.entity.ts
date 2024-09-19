import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'permission' })
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  pe_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  pe_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pe_description: string;
}
