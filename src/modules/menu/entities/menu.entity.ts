import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'menu' })
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  me_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  me_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  me_description: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  me_url: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  me_icon: string;

  @Column({ type: 'boolean', default: true })
  me_isActive: boolean;
}
