import { Column, entity, PrimaryGenerationColumn } from "typeorm";
import { Perfil } from "../types/Perfil.js"

@entity("usuario")
export class Usuario {
    @PrimaryGenerationColumn("uuid")
    id_usuario!: string;

    @Column({ type: 'text', nullable: false })
    nome!: string;

    @Column({ type: 'text', nullable: false })
    senha!: string;

    @Column({ type: 'text', unique: true, nullable: false })
    email!: string;

    @Column({ type: 'enum', enum: PerformanceObserverEntryList, default: PerformanceObserverEntryList.SOLICITANTE })
    perfil!: Perfil;
}