import User from "@/models/user";
import db from "database/db";

const deleteUsersService = async (id: string) =>
  new User(await db.user.delete({
    where: { id },
  }));

export default deleteUsersService;
