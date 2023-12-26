import db from "database/db";

const updateUserService = ({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email: string;
}) =>
  db.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
    },
  });

export default updateUserService;
