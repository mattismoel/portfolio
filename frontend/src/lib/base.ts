import z from "zod";

export const idSchema = z.string().nonempty();

export const baseFields = z.object({
	id: idSchema,
	created: z.coerce.date(),
	updated: z.coerce.date(),
});
