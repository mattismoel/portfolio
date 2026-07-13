<script>
	import { listTechProjects } from '$lib/features/tech-project/tech-project.remote';
</script>

<main class="h-full pt-48">
	<a href="/admin/tech-projects/create">Tilføj</a>

	{#await listTechProjects() then projects}
		<ul>
			{#each projects as project}
				<li>
					<a href="/admin/tech-projects/edit/{project.id}">{project.title}</a>
				</li>
			{/each}
		</ul>
	{/await}
</main>
