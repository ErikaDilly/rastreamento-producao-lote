import { AppDataSource } from "../config/data-source.js";
import { InspecaoLote } from "../entities/InspecaoLote.js";
import { Lote } from "../entities/Lote.js";
import { Usuario } from "../entities/Usuario.js";
import { StatusLote } from "../types/StatusLote.js";

export class InspecaoService {

  private repo = AppDataSource.getRepository(InspecaoLote);
  private loteRepo = AppDataSource.getRepository(Lote);
  private usuarioRepo = AppDataSource.getRepository(Usuario);

  async registrarInspecao(lote_id: number, data: any) {

    const lote = await this.loteRepo.findOneBy({ id: lote_id });
    const inspetor = await this.usuarioRepo.findOneBy({ id: data.inspetor_id });

    if (!lote) throw new Error("Lote não encontrado");
    if (!inspetor) throw new Error("Inspetor não encontrado");

    const existente = await this.repo.findOne({
      where: { lote: { id: lote_id } }
    });

    if (existente) {
      throw new Error("Lote já possui inspeção");
    }

    if (data.resultado !== "aprovado" && !data.descricao_desvio) {
      throw new Error("Descrição obrigatória para não aprovados");
    }

    const inspecao = this.repo.create({
      ...data,
      lote,
      inspetor
    });

    await this.repo.save(inspecao);

    // 🔥 Atualiza status automaticamente
    lote.status = data.resultado as StatusLote;
    lote.quantidade_repr = data.quantidade_repr;

    await this.loteRepo.save(lote);

    return inspecao;
  }
}