import User from "@/models/user";
import db from "database/db";

export default async function getUsersService() {
  const users = await db.user.findMany()
  return users.map(user => new User(user));
}
