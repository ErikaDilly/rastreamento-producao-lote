import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";

import { Lote } from "./Lote.js";

@Entity("insumo_lote")
export class InsumoLote {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Lote)
  @JoinColumn({ name: "lote_id" })
  lote!: Lote;

  @Column()
  nome_insumo!: string;

  @Column({ nullable: true })
  codigo_insumo?: string;

  @Column({ nullable: true })
  lote_insumo?: string;

  @Column({ type: "numeric" })
  quantidade!: number;

  @Column()
  unidade!: string;
}