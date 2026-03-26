import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Perfil } from "../types/Perfil.js"

@Entity("produto")
export class Produto {
    @PrimaryGeneratedColumn("uuid")
    id_produto!: string;

    @Column({ type: 'text', unique: true, nullable: false })
    codigo!: string;

    @Column({ type: 'text', nullable: false })
    nome!: string;

    @Column({ type: 'text', nullable: true })
    descricao?: string;

    @Column({ type: 'text', nullable: false })
    linha!: string;

    @Column({ type: 'boolean', default: true })
    ativo!: boolean;
}