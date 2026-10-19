import type { Handle } from "@sveltejs/kit/hooks";
import { POCKETBASE_URL } from "$app/env/private";
import PocketBase from "pocketbase";

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pocketbase = new PocketBase(POCKETBASE_URL);
	event.locals.pocketbase.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

	try {
		event.locals.pocketbase.authStore.isValid &&
			(await event.locals.pocketbase.collection("_superusers").authRefresh());
	} catch (_) {
		event.locals.pocketbase.authStore.clear();
	}

	const response = await resolve(event);

	response.headers.append("set-cookie", event.locals.pocketbase.authStore.exportToCookie());

	return response;
};
