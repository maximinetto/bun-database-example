import Serializable from "@/types/Serializable";
import { User as UserType } from "@prisma/client";
import { Static } from "elysia";
import { SimpleUserSerializable } from "./schema";

export default class User implements UserType, Serializable<Static<typeof SimpleUserSerializable>> {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: UserType) {
    this.id = data.id ?? crypto.randomUUID()
    this.name = data.name;
    this.email = data.email;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    }
  }

}