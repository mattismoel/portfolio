<script lang="ts">
	import IconContainer from '$lib/components/IconContainer.svelte';
	import type { Experience, ExperienceType } from '../experience';

	const experienceMap = new Map<ExperienceType, { title: string; icon: string }>([
		['workplace', { title: 'Workplace', icon: 'icon-[boxicons--briefcase-alt-2]' }],
		['education', { title: 'Education', icon: 'icon-[boxicons--backpack]' }],
		['volunteer', { title: 'Volunteer', icon: 'icon-[boxicons--people-diversity]' }],
		['project', { title: 'Project', icon: 'icon-[boxicons--brush]' }]
	]);

	type Props = {
		experience: Experience;
	};

	let { experience }: Props = $props();
	let { name, description, location, points, type, fromYear, toYear } = $derived(experience);

	const formatYears = (from: number, to: number) => {
		if (from === to) {
			return `${from}`;
		}

		return `${from} - ${to}`;
	};

	let expandable = $derived(points && points?.length > 0);
	let expanded = $state(false);
</script>

<li class="group py-6 first-of-type:pt-0 last-of-type:pb-0">
	<button
		disabled={!expandable}
		type="button"
		onclick={() => (expanded = !expanded)}
		class={['relative w-full text-left grid', expandable && 'cursor-pointer']}
	>
		{@render header(name, location, type)}

		<p class="sm:text-xs not-last:mb-4">{description}</p>

		{#if points && points.length > 0}
			{@render takeaways(points)}
		{/if}
	</button>
</li>

{#snippet header(name: string, location: string, type: ExperienceType)}
	<header class="mb-8 sm:mb-4 @container">
		<div class="flex justify-between flex-col @md:flex-row gap-4 sm:gap-2">
			<div>
				<h1 class="pointer-coarse:text-text-light font-bold sm:font-normal mb-2 sm:mb-1">{name}</h1>
				<IconContainer icon="icon-[boxicons--location]" class="sm:text-xs">
					{location}
				</IconContainer>
			</div>

			{@render typeBadge(type)}
		</div>
	</header>
{/snippet}

{#snippet takeaways(points: string[])}
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

{#snippet typeBadge(type: ExperienceType)}
	{@const { title, icon } = experienceMap.get(type)!}

	<span class="whitespace-nowrap sm:text-xs bg-zinc-800 h-fit w-fit py-1 px-3 rounded-full flex">
		<IconContainer {icon}>
			{title}
		</IconContainer>

		<span>,&nbsp;</span>

		{formatYears(fromYear, toYear)}
	</span>
{/snippet}
