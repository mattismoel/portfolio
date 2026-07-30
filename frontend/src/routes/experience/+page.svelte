<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { hasItems } from '$lib/array';
	import Card from '$lib/components/Card.svelte';
	import TabSelector from '$lib/components/TabSelector.svelte';
	import ExperienceEntry from '$lib/features/experience/components/ExperienceEntry.svelte';
	import {
		experienceTypes,
		type Experience,
		type ExperienceType
	} from '$lib/features/experience/experience';
	import { listExperiences } from '$lib/features/experience/experience.remote';
	import { fitsStringUnion } from '$lib/type';
	import { onMount } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';

	let selectedExperience = $state<ExperienceType>();

	const experienceToTabName: Record<ExperienceType, string> = {
		project: 'Projects',
		education: 'Education',
		volunteer: 'Volunteering',
		workplace: 'Workplaces'
	};

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

	let filteredExperiences = $derived.by(() => {
		if (!selectedExperience) return experiencesByYear;

		return experiencesByYear
			.map(
				([year, experiences]) =>
					[year, experiences.filter((exp) => exp.type === selectedExperience)] as const
			)
			.filter(([, experiences]) => hasItems(experiences));
	});

	const large = new MediaQuery('min-width: 800px');

	onMount(() => {
		const tabParam = page.url.searchParams.get('tab');

		if (!tabParam || !fitsStringUnion(tabParam, experienceTypes)) {
			selectedExperience = 'workplace';
			return;
		}

		selectedExperience = tabParam;
	});

	$effect(() => {
		goto(`/experience?tab=${selectedExperience}`);
	});
</script>

<main class="mx-responsive">
	<header class="mb-16">
		<h1 class="font-bold text-2xl mb-4 text-text-light">Previous Experience</h1>
		<p>
			This is an overview of all of my previous experiences&nbsp;&mdash;&nbsp;both work and
			education.
		</p>
	</header>

	{#if large.current && selectedExperience}
		<TabSelector
			title="What do you want to know about?"
			animate={selectedExperience === experienceTypes[0]}
			bind:selected={selectedExperience}
			tabs={experienceTypes.map((type) => ({ name: experienceToTabName[type], value: type }))}
		/>
	{/if}

	<div class="grid">
		{#each large.current ? filteredExperiences : experiencesByYear as [year, experiences]}
			{@render yearSeparator(year)}

			<Card class="py-8">
				<ul class="divide-y divide-text/20">
					{#each experiences as experience (experience.id)}
						<ExperienceEntry {experience} />
					{/each}
				</ul>
			</Card>
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
