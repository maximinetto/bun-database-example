// {
//   id: string,
//   name: string,
//   email: string,
//   createdAt: string,
//   updatedAt: string
// }

import { t } from "elysia";

export const BasicData = t.Object({
  name: t.String({ minLength: 3 }),
  email: t.String({ format: "email" }),
})

export const CreationTypes = t.Object({
  createdAt: t.Date(),
  updatedAt: t.Date()
})

export const CreationTypesToString = t.Object({
  createdAt: t.String({ format: "date" }),
  updatedAt: t.String({ format: "date" })
})

export const SimpleUserSerializable = t.Union([t.Object({
  id: t.String({ format: "uuid" }),
}), BasicData, CreationTypesToString])