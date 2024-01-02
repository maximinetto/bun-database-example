import apollo, { gql } from "@elysiajs/apollo";
import createUserService from "database/users/create";
import deleteUsersService from "database/users/delete";
import getUsersService from "database/users/get";
import updateUserService from "database/users/update";
import { Elysia, t } from "elysia";

const app = new Elysia()
  .use(
    apollo({
      typeDefs: [
        gql`
          type User {
            id: String
            email: String
            name: String
            createdAt: String
            updatedAt: String
          }
          type Query {
            users: [User]
          }

          type Mutation {
            createUser(name: String, email: String): User
            updateUser(id: String, name: String, email: String): User
            deleteUser(id: String): User
          }
        `,
      ],
      resolvers: {
        Query: {
          users: async () => {
            return await getUsersService();

          },
        },
        Mutation: {
          createUser: async (
            _,
            {
              name,
              email,
            }: {
              name: string;
              email: string;
            }
          ) => {
            const user = await createUserService({ name, email });
            return user;
          },
          updateUser: async (
            _,
            {
              id,
              name,
              email,
            }: {
              id: string;
              name: string;
              email: string;
            }
          ) => {
            const user = await updateUserService({ id, name, email });
            return user;
          },
          deleteUser: async (_, { id }: { id: string }) => {
            const user = await deleteUsersService(id);
            return user;
          },
        },
      },
    })
  )
  .guard(
    {
      body: t.Object({
        name: t.String({
          minLength: 3,
        }),
        email: t.String({
          format: "email",
        }),
      }),
    },
    (server) =>
      server
        .post("/users", async (req) => {
          const user = await createUserService(req.body);
          req.set.status = 201;
          return user
        })
        .put("/users/:id", async (req) => {
          const { id } = req.params;
          const { name, email } = req.body;
          const user = await updateUserService({ id, name, email });

          return user;
        })
  )
  .get("/users", async () => {
    return await getUsersService();
  })

  .delete("/users/:id", async (req) => {
    const { id } = req.params;
    await deleteUsersService(id);

    req.set.status = 204;
  });

export default app;
