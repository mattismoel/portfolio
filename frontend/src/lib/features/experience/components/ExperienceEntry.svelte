<script lang="ts">
	import IconContainer from '$lib/components/IconContainer.svelte';
	import Pill from '$lib/components/Pill.svelte';
	import type { Experience, ExperienceType } from '../experience';

	type ExperienceTypeProps = {
		name: string;
		icon: string;
	};

	const experienceTypes: Record<ExperienceType, ExperienceTypeProps> = {
		workplace: { name: 'Workplace', icon: 'icon-[boxicons--briefcase-alt-2]' },
		education: { name: 'Education', icon: 'icon-[boxicons--backpack]' },
		volunteer: { name: 'Volunteer', icon: 'icon-[boxicons--people-diversity]' },
		project: { name: 'Project', icon: 'icon-[boxicons--brush]' }
	};

	type Props = {
		experience: Experience;
	};

	let props: Props = $props();
	let { experience } = $derived(props);

	const formatYears = (from: number, to: number) => {
		if (from === to) {
			return `${from}`;
		}

		return `${from} - ${to}`;
	};

	let expandable = $derived(experience.points && experience.points?.length > 0);
	let expanded = $state(false);
</script>

<li class="group py-6 first-of-type:pt-0 last-of-type:pb-0">
	<button
		disabled={!expandable}
		type="button"
		onclick={() => (expanded = !expanded)}
		class={['relative w-full text-left grid', expandable && 'cursor-pointer']}
	>
		{@render header(
			experience.name,
			experience.location,
			experience.type,
			experience.fromYear,
			experience.toYear
		)}

		<p class="text-center sm:text-left sm:text-xs not-last:mb-6">{experience.description}</p>

		{#if experience.points && experience.points.length > 0}
			{@render takeaways(experience.points, expanded)}
		{/if}
	</button>
</li>

{#snippet header(
	title: string,
	location: string,
	type: ExperienceType,
	fromYear: number,
	toYear: number
)}
	<header class="mb-8 sm:mb-4 @container">
		<div
			class="flex items-center justify-between flex-col @md:flex-row gap-4 sm:gap-2 @md:items-start"
		>
			<div class="flex flex-col items-center @md:items-start">
				<h1
					class="text-xl @md:text-base pointer-coarse:text-text-light font-black sm:font-base mb-2 sm:mb-1"
				>
					{title}
				</h1>
				<IconContainer icon="icon-[boxicons--location]" class="sm:text-xs">
					{location}
				</IconContainer>
			</div>

			{@render typeBadge(type, fromYear, toYear)}
		</div>
	</header>
{/snippet}

{#snippet takeaways(points: string[], expanded: boolean)}
	<div class="@container">
		<div
			class={[
				'grid transition-[grid-template-rows,margin-bottom]',
				expanded ? 'grid-rows-[1fr] mb-8' : 'grid-rows-[0fr] mb-0'
			]}
		>
			<div class="overflow-hidden sm:text-xs">
				<p class="mb-2 sm:text-xs font-bold text-text-light">Key Takeaways</p>
				<ul class="list-disc list-inside">
					{#each points as point}
						<li>{point}</li>
					{/each}
				</ul>
			</div>
		</div>

		<IconContainer
			icon="icon-[boxicons--chevron-down]"
			class="pointer-coarse:text-text-light group-hover:text-text-light transition-colors sm:text-xs justify-center @md:justify-start"
			iconClass={['size-6 transition-transform', expanded && 'rotate-180']}
		>
			{#if expanded}
				Show Less
			{:else}
				View More
			{/if}
		</IconContainer>
	</div>
{/snippet}

{#snippet typeBadge(type: ExperienceType, fromYear: number, toYear: number)}
	{@const { name, icon } = experienceTypes[type]}
	{@const yearText = formatYears(fromYear, toYear)}

	<Pill {icon} shade="lighter" class="w-fit">
		<span>
			{name}<span>,&nbsp;</span>{yearText}
		</span>
	</Pill>
{/snippet}
