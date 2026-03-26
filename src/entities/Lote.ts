import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";

import { Produto } from "./Produto.js";
import { Usuario } from "./Usuario.js";
import { Turno } from "../types/Turno.js";
import { StatusLote } from "../types/StatusLote.js";

@Entity("lote")
export class Lote {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  numero_lote!: string;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: "produto_id" })
  produto!: Produto;

  @Column({ type: "date" })
  data_producao!: Date;

  @Column({
    type: "enum",
    enum: Turno
  })
  turno!: Turno;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "operador_id" })
  operador!: Usuario;

  @Column({ type: "int" })
  quantidade_prod!: number;

  @Column({ type: "int", default: 0 })
  quantidade_repr!: number;

  @Column({
    type: "enum",
    enum: StatusLote,
    default: StatusLote.EM_PRODUCAO
  })
  status!: StatusLote;

  @Column({ nullable: true })
  observacoes?: string;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP"
  })
  aberto_em!: Date;

  @Column({
    type: "timestamptz",
    nullable: true
  })
  encerrado_em?: Date;
}