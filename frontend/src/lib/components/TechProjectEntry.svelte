<script lang="ts">
	import SlideshowGallery from './SlideshowGallery.svelte';
	import { iconMap, type Technology } from '$lib/technology';
	import type { TechProject } from '$lib/features/tech-project/tech-project';
	import GridGallery from './GridGallery.svelte';
	import IconContainer from './IconContainer.svelte';
	import ResponsiveLink from './ResponsiveLink.svelte';

	type Props = {
		project: TechProject;
	};

	let { project }: Props = $props();
</script>

<div class="@container py-16 first:pt-0 last:pb-0">
	<div class="flex flex-col gap-4 md:flex-row md:justify-between mb-8">
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
						class="line-clamp-1 font-black sm:font-bold text-xl text-center sm:text-left sm:text-base hover:underline text-text-light"
					>
						{project.title}
					</h2>
				</IconContainer>
			</ResponsiveLink>
			<span>{project.finishYear}</span>
		</div>

		<div class="hidden @2xl:flex flex-col items-end gap-2">
			{@render techList(project.technologies)}
		</div>
	</div>

	<p class="leading-relaxed text-center mb-8 sm:text-left">{project.description}</p>

	{#if project.sourceHref}
		<ResponsiveLink
			href={project.sourceHref}
			target="__blank"
			class="flex justify-center mb-8 sm:justify-start"
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

	<div class="flex flex-col gap-4 mb-8 @2xl:hidden">
		<span class="text-xs text-center">Built with</span>
		{@render techList(project.technologies)}
	</div>

	<div class="grid gap-8">
		{#if project.href && project.usePreview}
			{@render sitePreview(project)}
		{/if}

		{#if project.images && project.images.length > 0}
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
		class="w-full relative group outline-0 aspect-video rounded-default outline-text/5 overflow-hidden hover:shadow-2xl hover:outline-8 transition-[outline-width]"
	>
		<iframe
			title={project.title}
			src={project.href}
			class="absolute inset-0 w-[400%] h-[400%] scale-[0.25] sm:w-[250%] sm:h-[250%] sm:scale-[0.4] origin-top-left group-hover:brightness-30 pointer-events-none transition-[filter]"
			scrolling="no"
		>
		</iframe>

		<IconContainer
			side="right"
			icon="icon-[boxicons--arrow-out-up-right-square]"
			class="text-text-light opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 items-center font-bold group-hover:opacity-100 transition-opacity underline"
		>
			Visit site
		</IconContainer>
	</a>
{/snippet}

{#snippet techList(technologies: Technology[])}
	<ul class="flex flex-wrap items-center gap-6 justify-center">
		{#each technologies as technology}
			{@const icon = iconMap.get(technology.name)}
			<li>
				<a
					href={technology.href}
					title={technology.name}
					class={['group text-text/50 transition-colors hover:text-text size-6', icon]}
				>
				</a>
			</li>
		{/each}
	</ul>
{/snippet}
