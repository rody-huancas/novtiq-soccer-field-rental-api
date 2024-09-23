import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'business' })
export class Business {
  @PrimaryGeneratedColumn('uuid')
  bu_id: string;

  @Column({ type: 'varchar', length: 255 })
  bu_name: string;

  @Column({ type: 'text', nullable: true })
  bu_description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  bu_logo: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  bu_phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  bu_email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  bu_address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bu_city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bu_country: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  bu_website: string;
}
