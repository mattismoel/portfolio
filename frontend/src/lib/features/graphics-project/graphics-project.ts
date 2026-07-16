import z from "zod";
import { pbImageSchema, pbProjectSchema, projectSchema } from "../project";
import { createFileUrl } from "$lib/pocketbase";

export const graphicsProjectSchema = projectSchema

export const pbGraphicsProjectSchema = pbProjectSchema.extend({
  expand: z.object({
    images: pbImageSchema.array()
  })
})

export type GraphicsProject = z.infer<typeof graphicsProjectSchema>
export type PBGraphicsProject = z.infer<typeof pbGraphicsProjectSchema>

export const mapPBGraphicsProject = (record: PBGraphicsProject): GraphicsProject => {
  return graphicsProjectSchema.parse({
    ...record,
    images: record.expand.images.map(img => ({
      ...img,
      src: createFileUrl("images", img.id, img.src),
    }))
  })
}

