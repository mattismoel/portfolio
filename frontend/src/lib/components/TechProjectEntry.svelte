<script lang="ts">
	import type { TechProject } from '$lib/project';
	import Icon from '@iconify/svelte';
	import SlideshowGallery from './SlideshowGallery.svelte';
	import { iconMap, type Technology } from '$lib/technology';

	type Props = {
		project: TechProject;
	};

	let { project }: Props = $props();
</script>

<div class="@container flex flex-col gap-12 py-16 first:pt-0 last:pb-0" role="presentation">
	<div class="flex flex-col gap-4 md:flex-row md:justify-between">
		<div class="flex flex-col">
			<a
				href={project.href}
				title={project.title}
				target="__blank"
				class="text-heading font-semibold flex gap-2 items-baseline hover:underline"
			>
				<h2>{project.title}</h2>

				<span class="icon-[boxicons--arrow-out-up-right-square] text-text/50"></span>
			</a>
			<span>{project.finishDate?.getFullYear()}</span>
		</div>

		<div class="hidden @2xl:flex flex-col items-end gap-2">
			{@render techList(project.technologies)}
		</div>
	</div>

	<p class="leading-relaxed">{project.description}</p>
	{#if project.sourceHref}
		<a
			href={project.sourceHref}
			target="__blank"
			class="flex items-center gap-2 hover:underline hover:text-heading w-fit"
		>
			Source Code
			<Icon icon="fa7-solid:external-link" class="text-text/50" />
		</a>
	{/if}

	<div class="flex flex-col gap-4 @2xl:hidden">
		<span class="text-xs text-center">Built with</span>
		{@render techList(project.technologies)}
	</div>

	{#if project.href}
		{@render sitePreview(project)}
	{/if}

	<div>
		<h2>Images</h2>
		<SlideshowGallery
			imgsSrcs={project.images.map((img) => ({ src: img.src, alt: img.description }))}
		/>
	</div>
</div>

{#snippet sitePreview(project: TechProject)}
	<a
		title={project.title}
		href={project.href}
		target="_blank"
		class="relative group outline-0 aspect-video rounded-xl outline-text/5 overflow-hidden hover:shadow-2xl hover:outline-8 transition-[outline-width]"
	>
		<iframe
			title={project.title}
			src={project.href}
			class="absolute inset-0 w-[250%] h-[250%] scale-[0.4] origin-top-left group-hover:brightness-40 pointer-events-none transition-[filter]"
			scrolling="no"
		>
		</iframe>

		<span
			class="opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 items-center font-bold group-hover:opacity-100 transition-opacity"
		>
			<span class="icon-[boxicons--arrow-out-up-right-square]"></span>
			Visit site
		</span>
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
					class={['group text-text/50 hover:text-text size-6', icon]}
				>
				</a>
			</li>
		{/each}
	</ul>
{/snippet}
