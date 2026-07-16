<script lang="ts">
	import TabSelector from '$lib/components/TabSelector.svelte';
	import ExperienceEntry from '$lib/features/experience/components/ExperienceEntry.svelte';
	import type { Experience, ExperienceType } from '$lib/features/experience/experience';
	import { listExperiences } from '$lib/features/experience/experience.remote';
	import { MediaQuery } from 'svelte/reactivity';

	let experiences = $derived(await listExperiences());

	let experiencesByYearMap = $derived.by(() => {
		const map = new Map<number, Experience[]>();

		for (const experience of experiences) {
			const year = experience.fromYear;

			map.set(year, [...(map.get(year) ?? []), experience]);
		}

		return map;
	});

	let experiencesByYear = $derived([...experiencesByYearMap.entries()].sort(([a], [b]) => b - a));

	let filterType = $state<ExperienceType>('workplace');

	let filteredExperiences = $derived.by(() => {
		if (filterType === undefined) return experiencesByYear;

		return experiencesByYear
			.map(
				([year, experiences]) =>
					[year, experiences.filter((exp) => exp.type === filterType)] as const
			)
			.filter(([, experiences]) => experiences.length > 0);
	});

	const large = new MediaQuery('min-width: 800px');
</script>

<main class="mx-responsive py-32">
	<header class="mb-8">
		<h1 class="font-bold text-2xl mb-4 text-text-light">Previous Experience</h1>
		<p>
			This is an overview of all of my previous experiences&nbsp;&mdash;&nbsp;both work and
			education.
		</p>
	</header>

	{#if large.current}
		<TabSelector
			bind:selected={filterType}
			tabs={[
				{ name: 'Workplaces', value: 'workplace' },
				{ name: 'Education', value: 'education' },
				{ name: 'Projects', value: 'project' },
				{ name: 'Volunteering', value: 'volunteer' }
			]}
		/>
	{/if}

	<div class="grid">
		{#each large.current ? filteredExperiences : experiencesByYear as [year, experiences]}
			{@render yearSeparator(year)}

			<div>
				<div class="bg-zinc-900 py-6 px-6 border border-zinc-800">
					<ul class="divide-y divide-text/20">
						{#each experiences as experience (experience.id)}
							<ExperienceEntry {experience} />
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>
</main>

{#snippet yearSeparator(year: number)}
	<div class="flex items-center gap-4 pt-20 pb-8 first-of-type:pt-0">
		<div class="sm:hidden w-full h-px bg-zinc-800"></div>
		<h1 class="text-text text-xs">{year}</h1>
		<div class="w-full h-px bg-zinc-800"></div>
	</div>
{/snippet}
