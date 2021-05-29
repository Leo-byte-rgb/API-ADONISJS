// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "../../Models/User";
import Hash from "@ioc:Adonis/Core/Hash";
import { sign } from "jsonwebtoken";
interface AuthData {
  email: string;
  password: string;
}

export default class AuthController {
  public async authenticate({ request }: HttpContextContract) {
    const { email, password }: AuthData = request.only(["email", "password"]);
    const user = await User.findBy("email", email);
    if (!user) return { error: "Usuário não encontrado" };
    if (!(await Hash.verify(user.password, password)))
      return { error: "Credênciais Inválidas" };
    const token = sign(
      {
        username: user.username,
        name: user.full_name,
        role: user.role,
        email: user.email,
        password: user.password,
        youtubeAccount: user.youtube_account,
        linkedinAccount: user.linkedin_account,
        instagramAccount: user.instagram_account,
      },
      "yourSecretKey",
      { expiresIn: "1h" }
    );
    return token;
  }
}
