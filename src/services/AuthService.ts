import { AppDataSource } from "../config/data-source.js";
import { Usuario } from "../entities/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {

  private repo = AppDataSource.getRepository(Usuario);

  async login(email: string, senha: string) {

    const user = await this.repo.findOne({ where: { email } });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      throw new Error("Senha inválida");
    }

    const token = jwt.sign(
      {
        id: user.id,
        perfil: user.perfil
      },
      process.env.JWT_SECRET!,
      { expiresIn: "8h" }
    );

    return {
      token,
      user
    };
  }
}