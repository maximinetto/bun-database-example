import User from "@/models/user";
import db from "database/db";

const updateUserService = async ({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email: string;
}) =>
  new User(await db.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
    },
  }));

export default updateUserService;
