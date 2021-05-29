// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

interface IUserData {
  email: string;
  password: string;
  username: string;
  name: string;
  youtube?: string;
  linkedin?: string;
  instagram?: string;
}

import User from "../../Models/User";
export default class UsersController {
  public async create(ctx: HttpContextContract) {
    const data: IUserData = ctx.request.only([
      "email",
      "password",
      "username",
      "name",
    ]);
    try {
      if (await User.findBy("email", data.email)) throw new Error();
      const user = await User.create({
        username: data.username,
        full_name: data.name,
        email: data.email,
        password: data.password,
      });
      return user;
    } catch {
      return { error: "Credênciais Inválidas" };
    }
  }

  public async all() {
    try {
      const users = await User.all();
      return users;
    } catch {
      return { error: "Erro ao procurar por usuários" };
    }
  }

  public async find(ctx: HttpContextContract) {
    try {
      const { id } = ctx.request.params();
      const user = await User.findBy("id", id);
      if (!user) throw new Error();
      return user;
    } catch {
      return { error: "Usuário Inexistente" };
    }
  }
  public async update(ctx: HttpContextContract) {
    try {
      const { id } = ctx.request.params();
      const { email, username, name, instagram, linkedin, youtube }: IUserData =
        ctx.request.only([
          "email",
          "password",
          "username",
          "name",
          "youtube",
          "linkedin",
          "instagram",
        ]);
      const user = await User.findBy("id", id);
      user
        ?.merge({
          username: username,
          full_name: name,
          email: email,
          instagram_account: instagram,
          linkedin_account: linkedin,
          youtube_account: youtube,
        })
        .save();
      return user;
    } catch (error) {
      return { error: "Ouve um erro ao atualizar a conta" };
    }
  }
  public async delete(ctx: HttpContextContract) {
    try {
      const { id } = ctx.request.params();
      const user = await User.findBy("id", id);
      if (!user) throw new Error();
      user.delete();
      return { message: "Usuário deletado com sucesso" };
    } catch {
      return { error: "Ouve um erro ao excluir a conta" };
    }
  }
}
