<script lang="ts">
  import ProjectList from "$lib/components/ProjectList.svelte";
  import { projectMap, sortedProjectArray } from "$lib/project";

  let projects = $derived(sortedProjectArray(projectMap));
</script>

<main class="px-auto py-32">
  <ProjectList {projects} />
</main>
