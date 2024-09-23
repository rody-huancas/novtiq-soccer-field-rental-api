import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
/* Entities */
import { Role } from '@modules/roles/roles/entities/role.entity';
/* Utils */
import { concatenateWords } from '@utils/functions';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  us_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  us_name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  us_lastname: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  us_fullname: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  us_document_type: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  us_document_number: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  us_email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  us_phone: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  us_gender: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  us_avatar_url: string;

  @Column({ type: 'date', nullable: true })
  us_date_of_birth: Date;

  @Column({ type: 'text', nullable: true })
  us_address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  us_country: string;
  
  @Column({ type: 'varchar', length: 100, nullable: true })
  us_city: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  us_username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  us_password: string;

  @Column({ type: 'boolean', default: true })
  us_status: boolean;

  @Column({ type: 'uuid', nullable: false })
  us_role_id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  us_created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  us_updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  us_last_login: Date;

  /* Relations */
  @ManyToOne(() => Role, (role) => role.ro_id)
  @JoinColumn({ name: 'us_role_id' })
  role: Role;

  @BeforeInsert()
  @BeforeUpdate()
  async transformarDatos() {
    this.us_name     = this.us_name.toUpperCase();
    this.us_lastname = this.us_lastname.toUpperCase();
    this.us_email    = this.us_email.toLowerCase();

    this.us_fullname = concatenateWords([this.us_name, this.us_lastname]);
  }
}