import z from "zod"
import { createFileUrl, pbBaseFields, pbIdSchema } from "./pocketbase"
import { pbTechnologySchema, technologySchema } from "./technology"

const idSchema = z.string().nonempty()

const baseFields = z.object({
  id: idSchema,
  created: z.coerce.date(),
  updated: z.coerce.date()
})

const imageSchema = z.object({
  ...baseFields.shape,
  src: z.string().nonempty(),
  description: z.string().nonempty(),
})

const pbImageSchema = z.object({
  ...pbBaseFields.shape,
  src: z.string().nonempty(),
  description: z.string().nonempty(),
})

const projectSchema = z.object({
  ...baseFields.shape,
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  finishDate: z.union([z.coerce.date(), z.undefined()]),
  images: imageSchema.array().nonempty()
})



const pbProjectSchema = z.object({
  ...pbBaseFields.shape,
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  finishDate: z.union([z.date(), z.undefined()]),
  images: pbIdSchema.array(),
})


const techProjectSchema = projectSchema.extend({
  href: z.url().optional(),
  sourceHref: z.url().optional(),
  technologies: technologySchema.array().min(1)
})

const pbTechProjectSchema = pbProjectSchema.extend({
  href: z.url().optional(),
  sourceHref: z.url().optional(),
  technologies: pbIdSchema.array(),
  expand: z.object({
    images: pbImageSchema.array(),
    technologies: pbTechnologySchema.array()
  })
})


const graphicsProject = projectSchema
const pbGraphicsProject = pbProjectSchema

type Project = z.infer<typeof projectSchema>

export type TechProject = z.infer<typeof techProjectSchema>
export type GraphicsProject = z.infer<typeof graphicsProject>

export type PBTechProject = z.infer<typeof pbTechProjectSchema>


// export const techProjects: TechProject[] = [
//   {
//     title: "Konnekt Website",
//     finishDate: parse("30/06/2025", DATE_FORMAT, new Date()),
//     description:
//       "Website for a youth-driven non-profit supporting upcoming local musicians. Has admin pages with role-based access for managing site content seamlessly.",
//     url: "https://knnkt.dk",
//     sourceUrl: "https://github.com/mattismoel/konnekt",
//     techologies: ["react", "typescript", "tailwindcss", "golang", "sqlite", "aws", "docker"],
//     imageSrcs: [
//       { src: KonnektHome, alt: "Front page" },
//       { src: KonnektArtists, alt: "Artists page" },
//       { src: KonnektAdmin, alt: "Admin Dashboard" },
//     ]
//   },
//   {
//     title: "PRISMA Website",
//     finishDate: parse("16/05/2024", DATE_FORMAT, new Date()),
//     description: "Website for the Danish band PRISMA, serving as an overview of upcoming show dates and band news and more.",
//     techologies: ["svelte-kit", "pocketbase", "tailwindcss", "docker", "aws"],
//     url: "https://prismatheband.com",
//     sourceUrl: "https://github.com/mattismoel/prisma-website",
//     imageSrcs: [
//       { src: PrismaHome, alt: "Front page" },
//       { src: PrismaContact, alt: "Contact page" },
//       { src: PrismaDashboard, alt: "Admin Dashboard" },
//     ]
//   },
//   {
//     title: "Villains of The Night (Game)",
//     description: "Video game for PRISMA's song 'Villains of The Night'. Played nationwide by radio hosts and artists, each competing for best scores.",
//     finishDate: parse("09/09/2021", DATE_FORMAT, new Date()),
//     techologies: ["unity", "c-sharp"],
//     url: "https://prismamusic.itch.io/votn",
//     imageSrcs: [
//       { src: VOTNGameplay, alt: "Gameplay" },
//       { src: VOTNAnimated, alt: "Animated GIF of logo" },
//       { src: VOTNLeaderboard, alt: "Populated leadboard" },
//     ]
//   },
//   {
//     title: "Abryx Typeface",
//     description: "A 7pt pixel typeface made for the Villains of The Night game. Made for low-resolution pixel games while preserving great legibility.",
//     finishDate: parse("10/10/2021", DATE_FORMAT, new Date()),
//     techologies: ["aseprite"],
//     url: "https://mattismoel.itch.io/abryx-font",
//     imageSrcs: [
//       { src: AbryxOverview, alt: "Overview over letters and symbols of the font" },
//     ],
//   }
// ]
//
// export const graphicsProjects: GraphicsProject[] = [
//   {
//     title: "Event Poster",
//     description: "I designed the poster for a concert event at my school. It is digitally hand-drawn in linocut-style, and given post-processing for a paper bleed effect.",
//     finishDate: parse("22/03/2024", DATE_FORMAT, new Date()),
//     imageSrcs: [
//       { src: AmatorBlue, alt: "Blue poster" },
//       { src: AmatorRed, alt: "Red poster" },
//       { src: AmatorBlack, alt: "Black poster" },
//     ]
//   },
//   {
//     title: "Event Poster (Kulturens Døgn)",
//     description: "I designed the poster for a local event by Konnekt in partnership with Kulturens Døgn. The design is dual-purposed, as it serves as an advertisement of the event for a general audience, as well as an open-invite call to local musicians to sign up for playing at the event.",
//     finishDate: parse("28/03/2025", DATE_FORMAT, new Date()),
//     imageSrcs: [
//       { src: KulturensDoegnGB1, alt: "Green and blue, variation 1" },
//       { src: KulturensDoegnGB2, alt: "Green and blue, variation 2" },
//     ]
//   },
//   {
//     title: "Event Poster (Konnekt)",
//     description: "I designed the poster for Konnekt's first official show, consisting of a selection of local hard rock bands. All lettering is hand digitally drawn, displaying the headliner in yellow.",
//     finishDate: parse("11/04/2025", DATE_FORMAT, new Date()),
//     imageSrcs: [
//       { src: PostenMay2025, alt: "Poster" },
//     ]
//   },
//   {
//     title: "Event Poster (Konnekt)",
//     finishDate: parse("13/08/2025", DATE_FORMAT, new Date()),
//     imageSrcs: [
//       { src: StormsAugust, alt: "Poster" },
//     ]
//   }
// ]

export const sortProjectsByFinishDate = <T extends Project>(projects: T[]): T[] => {
  return projects
    .sort((a, b) => {
      if (!a.finishDate && !b.finishDate) return 0;
      if (!a.finishDate) return -1;
      if (!b.finishDate) return 1;
      return b.finishDate.getTime() - a.finishDate.getTime();
    })
}

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
