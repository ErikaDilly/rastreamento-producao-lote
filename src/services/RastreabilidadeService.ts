import { AppDataSource } from "../config/data-source.js";
import { Lote } from "../entities/Lote.js";
import { InsumoLote } from "../entities/InsumoLote.js";

export class RastreabilidadeService {

  private loteRepo = AppDataSource.getRepository(Lote);
  private insumoRepo = AppDataSource.getRepository(InsumoLote);

  async porLote(numero_lote: string) {

    const lote = await this.loteRepo.findOne({
      where: { numero_lote },
      relations: ["produto", "operador"]
    });

    if (!lote) throw new Error("Lote não encontrado");

    const insumos = await this.insumoRepo.find({
      where: { lote: { id: lote.id } }
    });

    return {
      lote,
      insumos
    };
  }

  async porInsumo(codigo: string) {

    return this.insumoRepo
      .createQueryBuilder("insumo")
      .leftJoinAndSelect("insumo.lote", "lote")
      .where("insumo.codigo_insumo = :codigo OR insumo.lote_insumo = :codigo", { codigo })
      .getMany();
  }
}