<script lang="ts">
	import type { Experience } from '../experience';

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

	let expandable = $derived(points !== null && points?.length > 0);
	let expanded = $state(false);
</script>

<li class="group py-6 first-of-type:pt-0 last-of-type:pb-0">
	<button
		disabled={!expandable}
		type="button"
		onclick={() => (expanded = !expanded)}
		class={['relative w-full text-left flex justify-between', expandable && 'cursor-pointer']}
	>
		<div class="">
			<div class="not-last:mb-6">
				<h2
					class={[
						'font-medium transition-colors mb-2',
						expandable && 'group-hover:text-text-light'
					]}
				>
					{name}
				</h2>

				<div class="text-xs">
					<p class="flex gap-2 items-center mb-2">
						<span class="icon-[boxicons--location]"></span>{location}
					</p>
					<p>{description}</p>
				</div>
			</div>

			{#if points && points.length > 0}
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
			{/if}

			{#if points && points.length > 0}
				<span class="flex items-center gap-2">
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
			{/if}
		</div>

		<span
			class="absolute top-0 right-0 text-xs bg-zinc-800 h-fit w-fit py-1 px-3 rounded-full flex"
		>
			<span class="flex items-center gap-2">
				{#if type === 'workplace'}
					<span class="icon-[boxicons--briefcase-alt-2]"></span>
					Workplace
				{:else if type === 'education'}
					<span class="icon-[boxicons--backpack]"></span>
					Education
				{:else if type === 'volunteer'}
					<span class="icon-[boxicons--people-diversity]"></span>
					Volunteer
				{:else if type === 'project'}
					<span class="icon-[boxicons--brush]"></span>
					Project
				{/if}
			</span>

			<span>,&nbsp;</span>

			{formatYears(fromYear, toYear)}
		</span>
	</button>
</li>
