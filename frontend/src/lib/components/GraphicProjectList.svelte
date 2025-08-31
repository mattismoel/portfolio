<script lang="ts">
  import type { GraphicsProject } from "$lib/project";
  import GraphicsProjectEntry from "./GraphicProjectEntry.svelte";

  type Props = {
    projects: GraphicsProject[];
  };

  const { projects }: Props = $props();
</script>

<div class="flex flex-col divide-y divide-zinc-900">
  {#each projects as project}
    <GraphicsProjectEntry {project} />
  {/each}
</div>
