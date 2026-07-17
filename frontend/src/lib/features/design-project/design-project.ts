import z from "zod";
import { pbImageSchema, pbProjectSchema, projectSchema } from "../project";
import { createFileUrl } from "$lib/pocketbase";

export const designProjectSchema = projectSchema

export const pbDesignProjectSchema = pbProjectSchema.extend({
  expand: z.object({
    images: pbImageSchema.array()
  })
})

export type DesignProject = z.infer<typeof designProjectSchema>
export type PBDesignProject = z.infer<typeof pbDesignProjectSchema>

export const mapPBDesignProject = (record: PBDesignProject): DesignProject => {
  return designProjectSchema.parse({
    ...record,
    images: record.expand.images.map(img => ({
      ...img,
      src: createFileUrl("images", img.id, img.src),
    }))
  })
}

