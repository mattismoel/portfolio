import { form } from "$app/server";
import z from "zod";
import { getLocalsPocketBase } from "./pocketbase";
import { redirect } from "@sveltejs/kit";

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
})

export const login = form(loginSchema, async ({ email, password }) => {
  const pb = getLocalsPocketBase()

  await pb.collection("_superusers").authWithPassword(email, password)

  redirect(301, "/projects")
})
