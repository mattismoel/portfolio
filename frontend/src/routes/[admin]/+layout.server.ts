import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.pocketbase.authStore.isValid || !locals.pocketbase.authStore.isSuperuser) {
    redirect(301, "/login")
  }
}
