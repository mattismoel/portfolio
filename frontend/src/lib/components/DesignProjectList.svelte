<script lang="ts">
	import type { DesignProject } from "$lib/features/design-project/design-project";
	import DesignProjectEntry from "./DesignProjectEntry.svelte";

	type Props = {
		projects: DesignProject[];
	};

	const { projects }: Props = $props();
</script>

<div class="flex flex-col divide-y divide-zinc-900">
	{#each projects as project}
		<DesignProjectEntry {project} />
	{/each}
</div>
