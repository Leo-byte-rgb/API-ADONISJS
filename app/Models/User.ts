import { DateTime } from "luxon";
import { BaseModel, beforeSave, column } from "@ioc:Adonis/Lucid/Orm";
import Hash from "@ioc:Adonis/Core/Hash";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @column()
  public username: string;
  @column()
  public full_name: string;
  @column()
  public role: string;
  @column()
  public email: string;
  @column()
  public password: string;
  @column()
  public youtube_account: string;
  @column()
  public linkedin_account: string;
  @column()
  public instagram_account: string;
  @column()
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
