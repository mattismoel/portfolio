<script lang="ts">
	import GridGallery from './GridGallery.svelte';
	import type { GraphicsProject } from '$lib/features/design-project/design-project';

	type Props = {
		project: GraphicsProject;
	};

	const { project }: Props = $props();
</script>

<div class="py-16 first:pt-0 last:pb-0">
	<header class="mb-4">
		<h2 class="font-semibold text-heading">{project.title}</h2>
		{#if project.finishYear}
			<span>{project.finishYear}</span>
		{/if}
	</header>

	{#if project.description}
		<p class="leading-relaxed mb-8">{project.description}</p>
	{/if}

	<GridGallery srcs={project.images} class="sm:min-h-80" />
</div>
