import db from "database/db";

const createUserService = ({ name, email }: { name: string; email: string }) =>
  db.user.create({
    data: {
      name,
      email,
    },
  });

export default createUserService;
