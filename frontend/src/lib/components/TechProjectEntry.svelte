<script lang="ts">
	import SlideshowGallery from "./SlideshowGallery.svelte";
	import { iconMap, type Technology } from "$lib/technology";
	import type { TechProject } from "$lib/features/tech-project/tech-project";
	import GridGallery from "./GridGallery.svelte";
	import IconContainer from "./IconContainer.svelte";
	import ResponsiveLink from "./ResponsiveLink.svelte";
	import { hasItems, sortAlphabeticallyByProperty } from "$lib/array";

	type Props = {
		project: TechProject;
	};

	let { project }: Props = $props();
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
		{#if project.href && project.usePreview}
			{@render sitePreview(project)}
		{/if}

		{#if hasItems(project.images)}
			<div>
				{#if project.usePreview}
					<GridGallery
						srcs={project.images.map((img) => ({ src: img.src, alt: img.description }))}
					/>
				{:else}
					<SlideshowGallery
						imgsSrcs={project.images.map((img) => ({ src: img.src, alt: img.description }))}
					/>
				{/if}
			</div>
		{/if}
	</div>
</div>

{#snippet sitePreview(project: TechProject)}
	<a
		title={project.title}
		href={project.href}
		target="_blank"
		class="group relative aspect-video w-full overflow-hidden rounded-default outline-0 outline-text/5 transition-[outline-width] hover:shadow-2xl hover:outline-8"
	>
		<iframe
			title={project.title}
			src={project.href}
			class="pointer-events-none absolute inset-0 h-[400%] w-[400%] origin-top-left scale-[0.25] transition-[filter] group-hover:brightness-30 sm:h-[250%] sm:w-[250%] sm:scale-[0.4]"
			scrolling="no"
		>
		</iframe>

		<IconContainer
			side="right"
			icon="icon-[boxicons--arrow-out-up-right-square]"
			class="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 font-bold text-text-light underline opacity-0 transition-opacity group-hover:opacity-100"
		>
			Visit site
		</IconContainer>
	</a>
{/snippet}

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
