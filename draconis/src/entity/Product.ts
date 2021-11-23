import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  thumbnail: string;

  @Column({ type: "float" })
  price: number;

  @Column()
  ingredients: string;

  @Column({ type: "float" })
  avaliability: number;

  @Column()
  volume: number;

  @BeforeInsert()
  removeId() {
    if (this.id) delete this.id;
  }
}
