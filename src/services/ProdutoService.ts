import { AppDataSource } from "../config/data-source.js";
import { Produto } from "../entities/Produto.js";

export class ProdutoService {

  private repo = AppDataSource.getRepository(Produto);

  async create(data: Partial<Produto>) {
    const produto = this.repo.create(data);
    return this.repo.save(produto);
  }

  async findAll() {
    return this.repo.find();
  }

  async findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, data: Partial<Produto>) {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }
}