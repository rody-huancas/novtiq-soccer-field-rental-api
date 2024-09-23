import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
/* CONSTANTS */
import { REGEX_SPACE_ONLY } from '@config/constants';

@Entity({ name: 'persons' })
export class Person {
  @PrimaryGeneratedColumn('uuid')
  per_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  per_name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  per_last_name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  per_full_name: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  per_document_type: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  per_document_number: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  per_email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  per_phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  per_address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  per_city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  per_country: string;

  @BeforeInsert()
  @BeforeUpdate()
  async formatFields() {
    this.per_name      = this.per_name.toUpperCase();
    this.per_last_name = this.per_last_name.toUpperCase();
    this.per_email     = this.per_email.toLowerCase();
    this.per_phone     = this.per_phone.replace(REGEX_SPACE_ONLY, '');

    /* Formatear el nombre completo */
    this.per_full_name = `${this.per_name} ${this.per_last_name}`;
  }
}
