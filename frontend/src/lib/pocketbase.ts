import { getRequestEvent } from "$app/server";
import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import z from "zod";

export const pbIdSchema = z.string().nonempty();

export const pbBaseFields = z.object({
	id: pbIdSchema,
	created: z.coerce.date(),
	updated: z.coerce.date(),
});

export const getLocalsPocketBase = () => {
	const { locals } = getRequestEvent();
	return locals.pocketbase;
};

export const createExpandString = (properties: string[]) => {
	return properties.join(",");
};

export const createFileUrl = (collectionIdOrName: string, id: string, fileName: string) => {
	return `${PUBLIC_POCKETBASE_URL}/api/files/${collectionIdOrName}/${id}/${fileName}`;
};
