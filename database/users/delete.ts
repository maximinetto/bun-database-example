import db from "database/db";

const deleteUsersService = (id: string) =>
  db.user.delete({
    where: { id },
  });

export default deleteUsersService;
