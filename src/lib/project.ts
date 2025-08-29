import { type TechnologyName } from "./technology";
import { parse } from "date-fns"
import KonnektHome from "$lib/assets/projects/konnekt/konnekt-1.png"
import KonnektArtists from "$lib/assets/projects/konnekt/konnekt-2.png"
import KonnektAdmin from "$lib/assets/projects/konnekt/konnekt-3.png"

import KulturensDoegnGB1 from "$lib/assets/projects/konnekt/kulturens-doegn/green-blue-1.png"

import PostenMay2025 from "$lib/assets/projects/konnekt/posten-020525.png"
import StormsAugust from "$lib/assets/projects/konnekt/storms-290825.png"

import PrismaHome from "$lib/assets/projects/prisma/prisma-1.png"
import PrismaDashboard from "$lib/assets/projects/prisma/prisma-dashboard.png"
import PrismaContact from "$lib/assets/projects/prisma/prisma-3.png"

import VOTNAnimated from "$lib/assets/projects/villains-of-the-night/votn.gif"
import VOTNGameplay from "$lib/assets/projects/villains-of-the-night/votn-jump.png"
import VOTNLeaderboard from "$lib/assets/projects/villains-of-the-night/votn-leaderboard.png"

import AbryxOverview from "$lib/assets/projects/abryx/abryx-overview.png"

import { DATE_FORMAT } from "./time";

interface Project {
	title: string;
	description?: string;
	finishDate: Date | null;
	imageSrcs: { src: string, alt: string }[]
}

export interface TechProject extends Project {
	url: string;
	techologies: TechnologyName[]
}

export interface GraphicsProject extends Project { };

export const techProjects: TechProject[] = [
	{
		title: "Konnekt Website",
		finishDate: parse("30/06/2025", DATE_FORMAT, new Date()),
		description:
			"I developed a website for a youth-driven non-profit supporting upcoming local musicians, serving as an information hub for attendees, sponsors, and new volunteers. Content is managed through dedicated admin pages, with role-based access for creating and editing site content seamlessly.",
		url: "https://knnkt.dk",
		techologies: ["react", "javascript", "tailwindcss", "golang", "sqlite", "aws", "docker"],
		imageSrcs: [
			{ src: KonnektHome, alt: "Front page" },
			{ src: KonnektArtists, alt: "Artists page" },
			{ src: KonnektAdmin, alt: "Admin Dashboard" },
		]
	},
	{
		title: "PRISMA Website",
		finishDate: parse("16/05/2024", DATE_FORMAT, new Date()),
		description: "My first commercial website for my sistes' band PRISMA. Initially dabbled with a fully server-rendered Golang + HTMX application. I shifted gears however, for a more modern and maintainable stack - in the process learning new technologies and their respective values and tradeoffs.",
		techologies: ["svelte-kit", "pocketbase", "tailwindcss", "docker", "aws"],
		url: "https://prismatheband.com",
		imageSrcs: [
			{ src: PrismaHome, alt: "Front page" },
			{ src: PrismaContact, alt: "Contact page" },
			{ src: PrismaDashboard, alt: "Admin Dashboard" },
		]
	},
	{
		title: "Villains of The Night (Game)",
		description: "I made a video game for my sisters' band PRISMA's release of their single 'Villains of The Night' about escaping from the cops. It gained quite a lot of traction on national radio, where many radio hosts and artists placed their scores on the leaderboard.",
		finishDate: parse("09/09/2021", DATE_FORMAT, new Date()),
		techologies: ["unity", "c-sharp"],
		url: "https://prismamusic.itch.io/votn",
		imageSrcs: [
			{ src: VOTNGameplay, alt: "Gameplay" },
			{ src: VOTNAnimated, alt: "Animated GIF of logo" },
			{ src: VOTNLeaderboard, alt: "Populated leadboard" },
		]
	},
	{
		title: "Abryx Font",
		description: "I designed a pixel for the Villains of The Night game. It is a 7pt pixel font making it quite small, but still very legible on lower pixel art resolutions.",
		finishDate: parse("10/10/2021", DATE_FORMAT, new Date()),
		techologies: ["aseprite"],
		url: "https://mattismoel.itch.io/abryx-font",
		imageSrcs: [
			{ src: AbryxOverview, alt: "Overview over letters and symbols of the font" },
		],
	}
]

export const graphicsProjects: GraphicsProject[] = [
	{
		title: "Event Poster (Kulturens Døgn)",
		description: "I designed the poster for a local event in Odense 'Kulturens Døgn' in partnership with Konnekt.",
		finishDate: parse("28/03/2025", DATE_FORMAT, new Date()),
		imageSrcs: [
			{ src: KulturensDoegnGB1, alt: "Green and blue, variation 1" },
		]
	},
	{
		title: "Event Poster (Konnekt)",
		description: "I designed the poster for Konnekt's first official show, consisting of a selection of local hard rock bands.",
		finishDate: parse("11/04/2025", DATE_FORMAT, new Date()),
		imageSrcs: [
			{ src: PostenMay2025, alt: "Poster" },
		]
	},
	{
		title: "Event Poster (Konnekt)",
		description: "I designed the poste for one of Konnekt's outdoor autumn event.",
		finishDate: parse("13/08/2025", DATE_FORMAT, new Date()),
		imageSrcs: [
			{ src: StormsAugust, alt: "Poster" },
		]
	}
]

export const sortProjectsByFinishDate = <T extends Project>(projects: T[]): T[] => {
	return projects
		.sort((a, b) => {
			if (!a.finishDate && !b.finishDate) return 0;
			if (!a.finishDate) return -1;
			if (!b.finishDate) return 1;
			return b.finishDate.getDate() - a.finishDate.getDate();
		})
}
