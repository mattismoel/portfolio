<script lang="ts">
	import SlideshowGallery, { type SlideshowSrc } from "./SlideshowGallery.svelte";
	import { iconMap, type Technology } from "$lib/technology";
	import type { TechProject } from "$lib/features/tech-project/tech-project";
	import IconContainer from "./IconContainer.svelte";
	import ResponsiveLink from "./ResponsiveLink.svelte";
	import { hasItems, sortAlphabeticallyByProperty } from "$lib/array";

	type Props = {
		project: TechProject;
	};

	let { project }: Props = $props();

	let preview = $derived<SlideshowSrc | undefined>(
		project.usePreview
			? { type: "preview", href: project.href ?? "", title: project.title }
			: undefined,
	);

	let imageSrcs = $derived<SlideshowSrc[]>(
		project.images?.length
			? project.images.map((img) => ({ type: "image", src: img.src, alt: img.description }))
			: [],
	);

	let srcs = $derived([...(preview ? [preview] : []), ...imageSrcs]);

	// let srcs: SlideshowSrc[] = $derived([
	// 	...(project.usePreview
	// 		? [
	// 				{
	// 					type: "preview",
	// 					href: project.href ?? "",
	// 					title: project.title,
	// 				},
	// 			]
	// 		: []),
	// 	...(project.images?.length
	// 		? project.images.map((img) => ({
	// 				type: "image",
	// 				src: img.src,
	// 				alt: img.description,
	// 			}))
	// 		: []),
	// ]);
</script>

<div class="@container py-16 first:pt-0 last:pb-0">
	<div class="mb-8 flex flex-col gap-4 md:flex-row md:justify-between">
		<div class="flex flex-col items-center sm:items-start">
			<ResponsiveLink
				alwaysUnderline={false}
				href={project.href}
				title={project.title}
				target="__blank"
			>
				<IconContainer
					side="right"
					class="mb-4 sm:mb-1"
					iconClass="text-text"
					icon="icon-[boxicons--arrow-out-up-right-square]"
				>
					<h2
						class="line-clamp-1 text-center font-black text-text-light hover:underline sm:text-left sm:font-bold"
					>
						{project.title}
					</h2>
				</IconContainer>
			</ResponsiveLink>
			<span>{project.finishYear}</span>
		</div>

		<div class="hidden flex-col items-end gap-2 @2xl:flex">
			{@render techList(project.technologies)}
		</div>
	</div>

	<p class="mb-8 text-center leading-relaxed sm:text-left">{project.description}</p>

	{#if project.sourceHref}
		<ResponsiveLink
			href={project.sourceHref}
			target="__blank"
			class="mb-8 flex justify-center sm:justify-start"
		>
			<IconContainer
				side="right"
				iconClass="text-text"
				icon="icon-[boxicons--arrow-out-up-right-square]"
			>
				Source Code
			</IconContainer>
		</ResponsiveLink>
	{/if}

	<div class="mb-8 flex flex-col gap-4 @2xl:hidden">
		<span class="text-center text-xs">Built with</span>
		{@render techList(project.technologies)}
	</div>

	<div class="grid gap-8">
		<SlideshowGallery {srcs} />
	</div>
</div>

{#snippet techList(technologies: Technology[])}
	{@const sorted = sortAlphabeticallyByProperty(technologies, "name")}

	<ul class="flex flex-wrap items-center justify-center gap-6">
		{#each sorted as technology}
			{@const icon = iconMap.get(technology.name)}
			<li>
				<a
					href={technology.href}
					title={technology.name}
					class={["group size-6 text-text/50 transition-colors hover:text-text", icon]}
				>
				</a>
			</li>
		{/each}
	</ul>
{/snippet}
