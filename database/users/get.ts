import db from "database/db";

export default function getUsersService() {
  return db.user.findMany();
}
