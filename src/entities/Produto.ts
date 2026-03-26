import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from "typeorm";

@Entity("produto")
export class Produto {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  codigo!: string;

  @Column()
  nome!: string;

  @Column({ nullable: true })
  descricao?: string;

  @Column()
  linha!: string;

  @Column({ default: true })
  ativo!: boolean;
}