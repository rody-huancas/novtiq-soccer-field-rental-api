import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
/* Utils */
import { generateUrl } from "@utils/functions";

@Entity({ name: 'menu' })
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  me_id: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  me_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  me_description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  me_url: string;

  @Column({ type: 'text', nullable: false })
  me_icon: string;

  @Column({ type: 'boolean', default: true })
  me_isActive: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async generateUrl() {
    this.me_url = generateUrl(this.me_name);
  }
}
