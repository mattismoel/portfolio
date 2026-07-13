import type z from "zod"
import { pbProjectSchema, projectSchema } from "../project"

const graphicsProject = projectSchema
const pbGraphicsProject = pbProjectSchema

export type GraphicsProject = z.infer<typeof graphicsProject>
