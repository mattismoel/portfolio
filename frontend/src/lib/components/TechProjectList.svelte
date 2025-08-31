<script lang="ts">
  import type { TechProject } from "$lib/project";
  import TechProjectEntry from "./TechProjectEntry.svelte";

  type Props = {
    projects: TechProject[];
  };

  const { projects }: Props = $props();
</script>

<div class="flex flex-col divide-y divide-zinc-900">
  {#each projects as project}
    <TechProjectEntry {project} />
  {/each}
</div>
