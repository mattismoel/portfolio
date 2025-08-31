import type { Component } from "svelte"

export type TechnologyName =
	| "svelte-kit"
	| "react"
	| "golang"
	| "sqlite"
	| "docker"
	| "tailwindcss"
	| "pocketbase"
	| "typescript"
	| "aws"
	| "unity"
	| "c-sharp"
	| "aseprite"

export type Technology = {
	name: string;
	url: string;
} & ({
	iconName: string;
	Icon?: null
} | {
	iconName?: null;
	Icon: Component
})

export const technologyMap: Record<TechnologyName, Technology> = {
	"svelte-kit": {
		name: "SvelteKit",
		url: "https://svelte.dev/",
		iconName: "simple-icons:svelte"
	},
	"react": {
		name: "React",
		url: "https://react.dev",
		iconName: "fa7-brands:react"
	},
	"golang": {
		name: "Golang",
		url: "https://go.dev",
		iconName: "fa7-brands:golang"
	},
	"sqlite": {
		name: "SQLite",
		url: "https://sqlite.org",
		iconName: "simple-icons:sqlite"
	},
	"docker": {
		name: "Docker",
		url: "https://docs.docker.com",
		iconName: "fa7-brands:docker"
	},
	"aws": {
		name: "AWS",
		url: "https://aws.amazon.com",
		iconName: "fa7-brands:aws"
	},
	"tailwindcss": {
		name: "TailwindCSS",
		url: "https://tailwindcss.com",
		iconName: "simple-icons:tailwindcss"
	},
	"typescript": {
		name: "TypeScript",
		url: "https://www.typescriptlang.org/",
		iconName: "simple-icons:typescript"
	},
	"pocketbase": {
		name: "PocketBase",
		url: "https://pocketbase.io/",
		iconName: "simple-icons:pocketbase",
	},
	"unity": {
		name: "Unity",
		url: "https://unity.com/",
		iconName: "fa7-brands:unity"
	},
	"c-sharp": {
		name: "C#",
		url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
		iconName: "devicon-plain:csharp"
	},
	"aseprite": {
		name: "Aseprite",
		url: "https://www.aseprite.org/",
		iconName: "simple-icons:aseprite"
	}
};
