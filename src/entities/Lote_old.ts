import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    ManyToOne, 
    JoinColumn 
} from "typeorm";

import { Produto } from "./Produto.js";
import { Usuario } from "./Usuarios.js";
import { Perfil } from "../types/Perfil.js";

@Entity("lote")
export class Lote {
    @PrimaryGeneratedColumn("uuid")
    id_lote!: string;

    @Column({ type: 'text', unique: true })
    numero_lote!: string;

    // 🔗 RELACIONAMENTO COM PRODUTO
    @ManyToOne(() => Produto)
    @JoinColumn({ name: "produto_id" })
    produto!: Produto;

    @Column({ type: 'date', nullable: true })
    data_producao?: Date;

    // ✅ ENUM CORRETO
    @Column({ 
        type: 'enum', 
        enum: Perfil,
        default: Perfil.MANHA
    })
    turno!: Perfil;

    // 🔗 RELACIONAMENTO COM USUÁRIO
    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "operador_id" })
    operador!: Usuario;

    @Column({ type: 'int' })
    quantidade_prod!: number;

    @Column({ type: 'int', default: 0 })
    quantidade_repr!: number;

    // ✅ ENUM DE STATUS (inline)
    @Column({
        type: "enum",
        enum: ['em_producao', 'aguardando_inspecao', 'aprovado', 'aprovado_restricao', 'reprovado'],
        default: 'em_producao'
    })
    status!: string;

    @Column({ type: 'text', nullable: true })
    observacoes?: string;

    @Column({ 
        type: 'timestamp', 
        default: () => "CURRENT_TIMESTAMP" 
    })
    aberto_em!: Date;

    @Column({ type: 'timestamp', nullable: true })
    encerrado_em?: Date;
}