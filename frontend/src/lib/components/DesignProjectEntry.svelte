<script lang="ts">
	import type {
		DesignProject,
		DesignProjectType,
	} from "$lib/features/design-project/design-project";
	import GridGallery from "./GridGallery.svelte";
	import Pill from "./Pill.svelte";

	type ProjectTypeProps = {
		icon: string;
		name: string;
	};

	type Props = {
		project: DesignProject;
	};

	const { project }: Props = $props();

	const projectTypeProps: Record<DesignProjectType, ProjectTypeProps> = {
		graphics: { name: "Graphics Design", icon: "icon-[boxicons--pen-draw]" },
		product: { name: "Product Design", icon: "icon-[boxicons--compass-tool]" },
	};
</script>

<div class="py-16 first:pt-0 last:pb-0">
	<header class="mb-8 flex flex-col items-center sm:items-start">
		<h2 class="mb-1 font-black text-heading sm:font-bold">{project.title}</h2>
		{#if project.finishYear}
			<span class="mb-4">{project.finishYear}</span>
		{/if}

		{@render typeBadges(project.types)}
	</header>

	{#if project.description}
		<p class="mb-8 text-center leading-relaxed sm:text-left">{project.description}</p>
	{/if}

	{#if project.images}
		<GridGallery srcs={project.images} class="sm:min-h-80" />
	{/if}
</div>

{#snippet typeBadges(types: DesignProjectType[])}
	{@const props = types.map((type) => projectTypeProps[type])}

	<ul class="flex flex-wrap gap-2">
		{#each props as { name, icon }}
			<Pill {icon}>{name}</Pill>
		{/each}
	</ul>
{/snippet}
