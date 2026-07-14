<script lang="ts">
	import TechProjectForm from '$lib/features/tech-project/components/TechProjectForm.svelte';
	import {
		getTechProject,
		updateTechProject
	} from '$lib/features/tech-project/tech-project.remote';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
</script>

<main class="py-32 px-8">
	{#await getTechProject(params.projectId) then project}
		<TechProjectForm form={updateTechProject} {project} variant="update" />
	{/await}
</main>
