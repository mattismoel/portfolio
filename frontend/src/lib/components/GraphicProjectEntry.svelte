<script lang="ts">
	import type { GraphicsProject } from "$lib/project";
	import { format } from "date-fns";
	import GridGallery from "./GridGallery.svelte";

	type Props = {
		project: GraphicsProject;
	};

	const { project }: Props = $props();
</script>

<div class="@container w-full flex flex-col gap-8 py-16 first:pt-0 last:pb-0">
	<div>
		<h2 class="font-semibold text-heading">{project.title}</h2>
		{#if project.finishDate}
			<span>{format(project.finishDate, "MMMM yyyy")}</span>
		{/if}
	</div>
	<div class="flex flex-col gap-20">
		{#if project.description}
			<p class="leading-relaxed">{project.description}</p>
		{/if}
		<GridGallery srcs={project.imageSrcs} class="sm:min-h-80" />
	</div>
</div>
