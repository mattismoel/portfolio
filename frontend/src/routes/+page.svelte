<script lang="ts">
	import PersonalInfoCard from '$lib/components/PersonalInfoCard.svelte';
	import { info, socials } from '$lib/personal';
	import TechProjectList from '$lib/components/TechProjectList.svelte';
	import TabSelector from '$lib/components/TabSelector.svelte';
	import { listTechProjects } from '$lib/features/tech-project/tech-project.remote';
	import { listDesignProjects } from '$lib/features/design-project/design-project.remote';
	import DesignProjectList from '$lib/components/DesignProjectList.svelte';

	const tabNames = ['Tech', 'Design'] as const;
	type TabType = (typeof tabNames)[number];

	const tabs: TabType[] = ['Tech', 'Design'];
	let selectedTab = $state<TabType>('Tech');
</script>

<svelte:head>
	<title>Mattis Møl Kristensen | Home page</title>
	<meta name="description" content="The home page of Mattis Møl Kristensen" />
</svelte:head>

<main class="min-h-svh mx-responsive flex flex-col gap-20">
	<section class="flex flex-col gap-16">
		<PersonalInfoCard {info} {socials} />
		<p class="leading-relaxed">
			<span class="font-semibold text-heading">
				Hi, I'm {info.firstName}
				{info.lastName}.
			</span>
			<br /><br />
			I am an aspiring software developer based in {info.address.city}, {info.address.country}. This
			is a personal hub for all my projects and past experiences.
			<br /><br />
			Look around, take a peek into the projects, and let me know if you find something interesting!
		</p>
	</section>

	<section class="flex flex-1 flex-col gap-8">
		<TabSelector bind:selected={selectedTab} tabs={tabs.map((t) => ({ name: t, value: t }))} />

		{#await Promise.all( [listTechProjects(), listDesignProjects()] ) then [techProjects, designProjects]}
			{#if selectedTab === 'Tech'}
				<TechProjectList projects={techProjects} />
			{:else if selectedTab === 'Design'}
				<DesignProjectList projects={designProjects} />
			{/if}
		{/await}
	</section>
</main>
