<script lang="ts">
	import type {
		DesignProject,
		DesignProjectType
	} from '$lib/features/design-project/design-project';
	import GridGallery from './GridGallery.svelte';
	import IconContainer from './IconContainer.svelte';

	type Props = {
		project: DesignProject;
	};

	const { project }: Props = $props();
</script>

<div class="py-16 first:pt-0 last:pb-0">
	<header class="mb-8 grid">
		<h2 class="font-bold mb-1 text-heading">{project.title}</h2>
		{#if project.finishYear}
			<span class="mb-4">{project.finishYear}</span>
		{/if}

		{@render typeBadges(project.types)}
	</header>

	{#if project.description}
		<p class="leading-relaxed mb-8">{project.description}</p>
	{/if}

	<GridGallery srcs={project.images} class="sm:min-h-80" />
</div>

{#snippet typeBadges(types: DesignProjectType[])}
	<ul class="flex flex-wrap gap-2">
		{#each types as type}
			<li
				class="text-xs px-4 py-1 bg-zinc-900 border border-zinc-800 rounded-full flex items-center gap-2"
			>
				{#if type === 'product'}
					<IconContainer icon="icon-[boxicons--compass-tool]">Product Design</IconContainer>
				{:else if type === 'graphics'}
					<IconContainer icon="icon-[boxicons--pen-draw]">Graphics Design</IconContainer>
				{/if}
			</li>
		{/each}
	</ul>
{/snippet}
