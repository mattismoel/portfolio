<script lang="ts">
	import TechProjectForm from '$lib/features/tech-project/components/TechProjectForm.svelte';
	import { createTechProject } from '$lib/features/tech-project/tech-project.remote';
</script>

<main class="pt-32 px-8">
	<div class="grid gap-16">
		<TechProjectForm form={createTechProject} />
	</div>
</main>
