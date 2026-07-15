import z from "zod"
import { pbImageSchema, pbProjectSchema, projectSchema } from "../project"
import { pbTechnologySchema, technologySchema } from "$lib/technology"
import { createFileUrl, pbIdSchema } from "$lib/pocketbase"

const techProjectSchema = projectSchema.extend({
  href: z.url().optional(),
  sourceHref: z.union([z.url(), z.undefined()]),
  technologies: technologySchema.array().min(1)
})

const pbTechProjectSchema = pbProjectSchema.extend({
  href: z.url().optional(),
  sourceHref: z.union([z.url(), z.undefined()]),
  technologies: pbIdSchema.array(),
  expand: z.object({
    images: pbImageSchema.array(),
    technologies: pbTechnologySchema.array()
  })
})

export type TechProject = z.infer<typeof techProjectSchema>
export type PBTechProject = z.infer<typeof pbTechProjectSchema>

export const mapPBTechProject = (project: PBTechProject): TechProject => {
  return techProjectSchema.parse({
    ...project,
    technologies: project.expand.technologies,
    images: project.expand.images.map(img => ({
      ...img,
      src: createFileUrl("images", img.id, img.src),
    }))
  })
}
