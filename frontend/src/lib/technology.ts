import z from "zod"
import { pbBaseFields } from "./pocketbase"

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
])

export const technologySchema = z.object({
  ...pbBaseFields.shape,
  name: z.string().nonempty(),
  href: z.url().nonempty(),
})

export const pbTechnologySchema = z.object({
  ...pbBaseFields.shape,
  name: z.string().nonempty(),
  href: z.url().nonempty(),
})

export type Technology = z.infer<typeof technologySchema>
export type PBTechnology = z.infer<typeof pbTechnologySchema>

export const mapPBTechnology = (record: PBTechnology): Technology => {
  return technologySchema.parse(record)
}
