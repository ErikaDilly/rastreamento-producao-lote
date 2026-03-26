import { AppDataSource } from "../config/data-source.js";
import { Lote } from "../entities/Lote.js";
import { Produto } from "../entities/Produto.js";
import { Usuario } from "../entities/Usuario.js";
import { StatusLote } from "../types/StatusLote.js";

export class LoteService {

  private repo = AppDataSource.getRepository(Lote);
  private produtoRepo = AppDataSource.getRepository(Produto);
  private usuarioRepo = AppDataSource.getRepository(Usuario);

  // 🔢 Gerar número do lote
  private async gerarNumeroLote(): Promise<string> {
    const ano = new Date().getFullYear();

    const count = await this.repo.count();

    return `LOT-${ano}-${String(count + 1).padStart(5, "0")}`;
  }

  async create(data: any) {

    const produto = await this.produtoRepo.findOneBy({ id: data.produto_id });
    const operador = await this.usuarioRepo.findOneBy({ id: data.operador_id });

    if (!produto) throw new Error("Produto não encontrado");
    if (!operador) throw new Error("Operador não encontrado");

    const numero_lote = await this.gerarNumeroLote();

    const lote = this.repo.create({
      ...data,
      numero_lote,
      produto,
      operador,
      status: StatusLote.EM_PRODUCAO
    });

    return this.repo.save(lote);
  }

  async findAll(filters: any) {

    const query = this.repo.createQueryBuilder("lote")
      .leftJoinAndSelect("lote.produto", "produto")
      .leftJoinAndSelect("lote.operador", "operador");

    if (filters.status) {
      query.andWhere("lote.status = :status", { status: filters.status });
    }

    if (filters.produto_id) {
      query.andWhere("produto.id = :produto_id", { produto_id: filters.produto_id });
    }

    return query.getMany();
  }

  async findById(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ["produto", "operador"]
    });
  }

  async updateStatus(id: number, status: StatusLote) {

    const lote = await this.findById(id);

    if (!lote) throw new Error("Lote não encontrado");

    lote.status = status;

    if (status === StatusLote.AGUARDANDO_INSPECAO) {
      lote.encerrado_em = new Date();
    }

    return this.repo.save(lote);
  }
}