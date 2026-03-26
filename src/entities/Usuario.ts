import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from "typeorm";

import { Perfil } from "../types/Perfil.js";

@Entity("usuario")
export class Usuario {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  nome!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "text" })
  senha!: string;

  @Column({
    type: "enum",
    enum: Perfil
  })
  perfil!: Perfil;
}