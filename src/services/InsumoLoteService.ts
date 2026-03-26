import { AppDataSource } from "../config/data-source.js";
import { InsumoLote } from "../entities/InsumoLote.js";
import { Lote } from "../entities/Lote.js";
import { StatusLote } from "../types/StatusLote.js";

export class InsumoLoteService {

  private repo = AppDataSource.getRepository(InsumoLote);
  private loteRepo = AppDataSource.getRepository(Lote);

  async addInsumo(lote_id: number, data: any) {

    const lote = await this.loteRepo.findOneBy({ id: lote_id });

    if (!lote) throw new Error("Lote não encontrado");

    if (lote.status !== StatusLote.EM_PRODUCAO) {
      throw new Error("Não é possível adicionar insumos fora de produção");
    }

    const insumo = this.repo.create({
      ...data,
      lote
    });

    return this.repo.save(insumo);
  }

  async removeInsumo(id: number) {

    const insumo = await this.repo.findOne({
      where: { id },
      relations: ["lote"]
    });

    if (!insumo) throw new Error("Insumo não encontrado");

    if (insumo.lote.status !== StatusLote.EM_PRODUCAO) {
      throw new Error("Não pode remover insumo após produção");
    }

    return this.repo.delete(id);
  }

  async findByLote(lote_id: number) {
    return this.repo.find({
      where: { lote: { id: lote_id } }
    });
  }
}