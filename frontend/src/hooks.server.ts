import { env } from "$env/dynamic/private"
import { env as publicEnv } from "$env/dynamic/public"
import PocketBase from "pocketbase"

import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  console.log("PB PRIVATE", env.POCKETBASE_URL, "PB PUBLIC", publicEnv.PUBLIC_POCKETBASE_URL)
  event.locals.pocketbase = new PocketBase(env.POCKETBASE_URL)
  event.locals.pocketbase.authStore.loadFromCookie(event.request.headers.get("cookie") || "")

  try {
    event.locals.pocketbase.authStore.isValid && await event.locals.pocketbase.collection("_superusers").authRefresh()
  } catch (_) {
    event.locals.pocketbase.authStore.clear()
  }

  const response = await resolve(event)

  response.headers.append("set-cookie", event.locals.pocketbase.authStore.exportToCookie())

  return response
}
