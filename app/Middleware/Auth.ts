import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { decode } from "jsonwebtoken";
import User from "../Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

interface IUserData {
  email: string;
  password: string;
  username: string;
  name: string;
  youtube?: string;
  linkedin?: string;
  instagram?: string;
}
export default class Auth {
  public async handle(
    { request }: HttpContextContract,
    next: () => Promise<void>
  ) {
    if (!request.header("Bearer")) throw new Error("Não autorizado.");
    const bearer = request.header("Bearer");
    if (!bearer) throw new Error("Não autorizado.");
    const decoded: any = decode(bearer ? bearer : "");
    if (!decoded) throw new Error("Não autorizado.");
    console.log(decoded);
    const user = await User.findBy("email", decoded.email);
    if (!user) throw new Error("Não autorizado.");
    if (await Hash.verify(user.password, decoded.password))
      throw new Error("Não autorizado.");
    await next();
  }
}
