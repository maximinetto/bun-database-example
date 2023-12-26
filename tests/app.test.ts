import app from "app";
import { describe, expect, it, jest, mock } from "bun:test";

const usersData = [
  {
    id: crypto.randomUUID(),
    name: "Maximiliano Minetto",
    email: "maximinetto@gmail.com",
    createdAt: "2022-04-01T16:00:00z",
    updatedAt: "2022-05-03T12:01:00z",
  },
  {
    id: crypto.randomUUID(),
    name: "Gabriel Mercado",
    email: "gabimercado@gmail.com",
    createdAt: "2021-02-13T12:00:00z",
    updatedAt: "2022-05-23T13:01:00z",
  },
];

mock.module("../database/users/get.ts", () => {
  return {
    default: jest.fn().mockResolvedValue(usersData),
  };
});

describe("Users", () => {
  it("return a list of saved users", async () => {
    const response = await app
      .handle(
        new Request("http://localhost/users", {
          method: "GET",
        })
      )
      .then((res) => res.json());

    expect(response).toEqual(usersData);
  });
});
