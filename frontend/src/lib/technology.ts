import z from "zod"
import { pbBaseFields } from "./pocketbase"

export const iconMap = new Map<string, string>([
  ["Golang", "icon-[simple-icons--golang]"],
  ["SveltKit", "icon-[simple-icons--svelte]"],
  ["TypeScript", "icon-[simple-icons--typescript]"],
  ["SQLite", "icon-[simple-icons--sqlite]"],
  ["PocketBase", "icon-[simple-icons--pocketbase]"],
  ["React", "icon-[simple-icons--react]"],
  ["TailwindCSS", "icon-[simple-icons--tailwindcss]"],
  ["AWS", "icon-[simple-icons--aws]"],
  ["Docker", "icon-[simple-icons--docker]"],
  ["Aseprite", "icon-[simple-icons--aseprite]"],
  ["Unity", "icon-[simple-icons--unity]"],
  ["C-Sharp", "icon-[simple-icons--c-sharp]"],
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
