import User from "@/models/user";
import db from "database/db";

const createUserService = async ({ name, email }: { name: string; email: string }) =>
  new User(await db.user.create({
    data: {
      name,
      email,
    },
  }));

export default createUserService;
