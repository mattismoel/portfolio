import z from "zod";

export const iconMap = new Map<string, string>([
	["Golang", "icon-[simple-icons--go]"],
	["Caddy", "icon-[simple-icons--caddy]"],
	["SvelteKit", "icon-[simple-icons--svelte]"],
	["TypeScript", "icon-[simple-icons--typescript]"],
	["SQLite", "icon-[simple-icons--sqlite]"],
	["PocketBase", "icon-[simple-icons--pocketbase]"],
	["React", "icon-[simple-icons--react]"],
	["TailwindCSS", "icon-[simple-icons--tailwindcss]"],
	["AWS", "icon-[simple-icons--amazon]"],
	["Docker", "icon-[simple-icons--docker]"],
	["Aseprite", "icon-[simple-icons--aseprite]"],
	["Unity", "icon-[simple-icons--unity]"],
	["C#", "icon-[bxl--c-sharp]"],
	["CSS", "icon-[simple-icons--css]"],
]);

export const technologySchema = z.object({
	// ...pbBaseFields.shape,
	name: z.string().nonempty(),
	href: z.url().nonempty(),
});

export type Technology = z.infer<typeof technologySchema>;
