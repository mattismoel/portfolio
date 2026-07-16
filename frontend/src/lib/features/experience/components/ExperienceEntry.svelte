<script lang="ts">
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

		<p class="text-xs not-last:mb-4">{description}</p>

		{#if points && points.length > 0}
			{@render takeaways(points)}
		{/if}
	</button>
</li>

{#snippet header(name: string, location: string, type: ExperienceType)}
	<header class="mb-4 @container">
		<div class="flex justify-between flex-col @md:flex-row gap-2">
			<div>
				<h1>{name}</h1>
				<p class="text-xs flex items-center gap-2">
					<span class="icon-[boxicons--location]"></span>{location}
				</p>
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
				expanded ? 'grid-rows-[1fr] mb-4' : 'grid-rows-[0fr] mb-0'
			]}
		>
			<div class="overflow-hidden">
				<p class="mb-2 text-xs font-bold">Key Takeaways</p>
				<ul class="list-disc list-inside text-xs">
					{#each points as point}
						<li>{point}</li>
					{/each}
				</ul>
			</div>
		</div>

		<span class="flex items-center gap-2 justify-center @md:justify-start">
			<span
				class={['icon-[boxicons--chevron-down] transition-transform', expanded && 'rotate-180']}
			>
			</span>

			<span class="text-xs group-hover:text-text-light transition-colors">
				{#if expanded}
					Show Less
				{:else}
					View More
				{/if}
			</span>
		</span>
	</div>
{/snippet}

{#snippet typeBadge(type: ExperienceType)}
	{@const { title, icon } = experienceMap.get(type)!}

	<span class="whitespace-nowrap text-xs bg-zinc-800 h-fit w-fit py-1 px-3 rounded-full flex">
		<span class="flex items-center gap-2">
			<span class={icon}></span>
			{title}
		</span>

		<span>,&nbsp;</span>

		{formatYears(fromYear, toYear)}
	</span>
{/snippet}
