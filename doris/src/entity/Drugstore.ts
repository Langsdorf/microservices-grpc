import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Drugstore {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  logo: string;

  @Column()
  time_open: string;

  @Column()
  time_close: string;

  @Column()
  in_charge: string;

  @Column()
  branches: string;

  @BeforeInsert()
  removeId() {
    if (this.id) delete this.id;
  }
}
