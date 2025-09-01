import { type TechnologyName } from "./technology";
import { parse } from "date-fns"
import KonnektHome from "$lib/assets/projects/konnekt/konnekt-1.png"
import KonnektArtists from "$lib/assets/projects/konnekt/konnekt-2.png"
import KonnektAdmin from "$lib/assets/projects/konnekt/konnekt-3.png"

import AmatorRed from "$lib/assets/projects/amator-red.png"
import AmatorBlue from "$lib/assets/projects/amator-blue.png"
import AmatorBlack from "$lib/assets/projects/amator-black.png"

import KulturensDoegnGB1 from "$lib/assets/projects/konnekt/kulturens-doegn/green-blue-1.png"
import KulturensDoegnGB2 from "$lib/assets/projects/konnekt/kulturens-doegn/green-blue-2.png"

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
import type { HTMLImgAttributes } from "svelte/elements";

interface Project {
	title: string;
	description?: string;
	finishDate: Date | null;
	imageSrcs: { src: HTMLImgAttributes["src"], alt: string }[]
}

export interface TechProject extends Project {
	url: string;
	sourceUrl?: string;
	techologies: TechnologyName[]
}

export interface GraphicsProject extends Project { };

export const techProjects: TechProject[] = [
	{
		title: "Konnekt Website",
		finishDate: parse("30/06/2025", DATE_FORMAT, new Date()),
		description:
			"Website for a youth-driven non-profit supporting upcoming local musicians. Has admin pages with role-based access for managing site content seamlessly.",
		url: "https://knnkt.dk",
		sourceUrl: "https://github.com/mattismoel/konnekt",
		techologies: ["react", "typescript", "tailwindcss", "golang", "sqlite", "aws", "docker"],
		imageSrcs: [
			{ src: KonnektHome, alt: "Front page" },
			{ src: KonnektArtists, alt: "Artists page" },
			{ src: KonnektAdmin, alt: "Admin Dashboard" },
		]
	},
	{
		title: "PRISMA Website",
		finishDate: parse("16/05/2024", DATE_FORMAT, new Date()),
		description: "Website for the Danish band PRISMA, serving as an overview of upcoming show dates and band news and more.",
		techologies: ["svelte-kit", "pocketbase", "tailwindcss", "docker", "aws"],
		url: "https://prismatheband.com",
		sourceUrl: "https://github.com/mattismoel/prisma-website",
		imageSrcs: [
			{ src: PrismaHome, alt: "Front page" },
			{ src: PrismaContact, alt: "Contact page" },
			{ src: PrismaDashboard, alt: "Admin Dashboard" },
		]
	},
	{
		title: "Villains of The Night (Game)",
		description: "Video game for PRISMA's song 'Villains of The Night'. Played nationwide by radio hosts and artists, each competing for best scores.",
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
		title: "Abryx Typeface",
		description: "A 7pt pixel typeface made for the Villains of The Night game. Made for low-resolution pixel games while preserving great legibility.",
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
		title: "Event Poster",
		description: "I designed the poster for a concert event at my school. It is digitally hand-drawn in linocut-style, and given post-processing for a paper bleed effect.",
		finishDate: parse("22/03/2024", DATE_FORMAT, new Date()),
		imageSrcs: [
			{ src: AmatorBlue, alt: "Blue poster" },
			{ src: AmatorRed, alt: "Red poster" },
			{ src: AmatorBlack, alt: "Black poster" },
		]
	},
	{
		title: "Event Poster (Kulturens Døgn)",
		description: "I designed the poster for a local event by Konnekt in partnership with Kulturens Døgn. The design is dual-purposed, as it serves as an advertisement of the event for a general audience, as well as an open-invite call to local musicians to sign up for playing at the event.",
		finishDate: parse("28/03/2025", DATE_FORMAT, new Date()),
		imageSrcs: [
			{ src: KulturensDoegnGB1, alt: "Green and blue, variation 1" },
			{ src: KulturensDoegnGB2, alt: "Green and blue, variation 2" },
		]
	},
	{
		title: "Event Poster (Konnekt)",
		description: "I designed the poster for Konnekt's first official show, consisting of a selection of local hard rock bands. All lettering is hand digitally drawn, displaying the headliner in yellow.",
		finishDate: parse("11/04/2025", DATE_FORMAT, new Date()),
		imageSrcs: [
			{ src: PostenMay2025, alt: "Poster" },
		]
	},
	{
		title: "Event Poster (Konnekt)",
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
			return b.finishDate.getTime() - a.finishDate.getTime();
		})
}
