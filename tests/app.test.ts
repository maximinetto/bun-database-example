import app from '@/app';
import User from '@/models/user';
import { edenTreaty } from '@elysiajs/eden';
import { describe, expect, it, mock } from "bun:test";
import { z } from 'zod';
import "./toJSONEqual";

const usersData = [
  {
    id: crypto.randomUUID(),
    name: "Maximiliano Minetto",
    email: "maximinetto@gmail.com",
    createdAt: new Date("2022-04-01T16:00:00z"),
    updatedAt: new Date("2022-05-03T12:01:00z"),
  },
  {
    id: crypto.randomUUID(),
    name: "Gabriel Mercado",
    email: "gabimercado@gmail.com",
    createdAt: new Date("2021-02-13T12:00:00z"),
    updatedAt: new Date("2022-05-23T13:01:00z"),
  },
];

const mockUsers = usersData.map(user => new User(user))

app.listen(3000)

const api = edenTreaty<typeof app>('http://localhost:3000')

mock.module("../database/users/get.ts", () => {
  return {
    default: () => mockUsers,
  };
});

describe("Users", () => {
  it("returns a list of saved users", async () => {
    const response = await api.users.get()
    const users = response.data;
    const schema = z.array(z.object({
      id: z.string().uuid(),
      name: z.string().min(3),
      email: z.string().email(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }))


    const validator = schema.safeParse(users)
    expect(validator.success).toBeTrue();

    expect(users).toJSONEqual(mockUsers)
  });
  it("saves a new record in the database", async () => {
    const mockUser: User = new User({

      id: crypto.randomUUID(),
      name: "Maximiliano Minetto",
      email: "maximinetto@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    })

    mock.module("../database/users/create.ts", () => {
      return {
        default: () => mockUser
      }
    })

    const response = await api.users.post({
      name: mockUser.name,
      email: mockUser.email,
    });
    const userData = response.data;

    expect(userData).toJSONEqual(mockUser)
  })
  it("updates a record in the database", async () => {
    const mockUser: User = new User({
      id: crypto.randomUUID(),
      name: "Maximiliano Minetto",
      email: "maximinetto@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    })

    mock.module("../database/users/update.ts", () => {
      return {
        default: () => mockUser
      }
    });

    const response = await api.users[`:${mockUser.id}`].put({
      name: mockUser.name,
      email: mockUser.email,
    });
    const userData = response.data;

    expect(userData).toJSONEqual(mockUser)

  })

  it("deletes a record in the database", async () => {
    const mockUser: User = new User({
      id: crypto.randomUUID(),
      name: "Maximiliano Minetto",
      email: "maximinetto@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    })

    mock.module("../database/users/delete.ts", () => {
      return {
        default: () => mockUser
      }
    });

    const response = await api.users[`:${mockUser.id}`].delete();
    const { data } = response;

    expect(data).toBeEmpty()
  })
});
