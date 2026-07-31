<script lang="ts">
	import { hasItems } from "$lib/array";
	import IconContainer from "$lib/components/IconContainer.svelte";
	import Pill from "$lib/components/Pill.svelte";
	import type { Experience, ExperienceType } from "../experience";

	type ExperienceTypeProps = {
		name: string;
		icon: string;
	};

	const experienceTypes: Record<ExperienceType, ExperienceTypeProps> = {
		workplace: { name: "Workplace", icon: "icon-[boxicons--briefcase-alt-2]" },
		education: { name: "Education", icon: "icon-[boxicons--backpack]" },
		volunteer: { name: "Volunteer", icon: "icon-[boxicons--people-diversity]" },
		project: { name: "Project", icon: "icon-[boxicons--brush]" },
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

	let expandable = $derived(hasItems(experience.points));
	let expanded = $state(false);
</script>

<li class="group py-6 first-of-type:pt-0 last-of-type:pb-0">
	<button
		disabled={!expandable}
		type="button"
		onclick={() => (expanded = !expanded)}
		class={["relative grid w-full text-left", expandable && "cursor-pointer"]}
	>
		{@render header(
			experience.name,
			experience.location,
			experience.type,
			experience.fromYear,
			experience.toYear,
		)}

		<p class="text-center not-last:mb-6 sm:text-left sm:text-xs">{experience.description}</p>

		{#if hasItems(experience.points)}
			{@render takeaways(experience.points, expanded)}
		{/if}
	</button>
</li>

{#snippet header(
	title: string,
	location: string,
	type: ExperienceType,
	fromYear: number,
	toYear: number,
)}
	<header class="@container mb-8 sm:mb-4">
		<div
			class="flex flex-col items-center justify-between gap-4 sm:gap-2 @md:flex-row @md:items-start"
		>
			<div class="flex flex-col items-center @md:items-start">
				<h1 class="mb-2 text-center font-black sm:mb-1 sm:font-bold pointer-coarse:text-text-light">
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
				"grid transition-[grid-template-rows,margin-bottom]",
				expanded ? "mb-8 grid-rows-[1fr]" : "mb-0 grid-rows-[0fr]",
			]}
		>
			<div class="overflow-hidden sm:text-xs">
				<p class="mb-2 font-bold text-text-light sm:text-xs">Key Takeaways</p>
				<ul class="list-inside list-disc">
					{#each points as point}
						<li>{point}</li>
					{/each}
				</ul>
			</div>
		</div>

		<IconContainer
			icon="icon-[boxicons--chevron-down]"
			class="justify-center transition-colors group-hover:text-text-light sm:text-xs @md:justify-start pointer-coarse:text-text-light"
			iconClass={["size-6 transition-transform", expanded && "rotate-180"]}
		>
			{#if expanded}
				Hide Details
			{:else}
				Show Details
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
