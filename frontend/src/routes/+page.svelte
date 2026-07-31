<script lang="ts">
	import PersonalInfoCard from "$lib/components/PersonalInfoCard.svelte";
	import { info, socials } from "$lib/personal";
	import TechProjectList from "$lib/components/TechProjectList.svelte";
	import TabSelector from "$lib/components/TabSelector.svelte";
	import { listTechProjects } from "$lib/features/tech-project/tech-project.remote";
	import { listDesignProjects } from "$lib/features/design-project/design-project.remote";
	import DesignProjectList from "$lib/components/DesignProjectList.svelte";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { fitsStringUnion } from "$lib/type";

	const tabNames = ["Tech", "Design"] as const;
	type TabType = (typeof tabNames)[number];

	const tabs: TabType[] = ["Tech", "Design"];
	let selectedTab = $state<TabType>();

	onMount(() => {
		const tabParam = page.url.searchParams.get("tab");

		if (!tabParam || !fitsStringUnion(tabParam, tabNames)) {
			selectedTab = "Tech";
			return;
		}

		selectedTab = tabParam;
	});

	$effect(() => {
		goto(`/?tab=${selectedTab}`);
	});
</script>

<svelte:head>
	<title>Mattis Møl Kristensen | Home page</title>
	<meta name="description" content="The home page of Mattis Møl Kristensen" />
</svelte:head>

<main class="mx-responsive grid min-h-svh gap-20">
	<section class="grid gap-16">
		<PersonalInfoCard {info} {socials} />

		<p class="text-center leading-relaxed sm:text-left">
			<span class="font-semibold text-heading">
				Hi, I'm {info.firstName}
				{info.lastName}.
			</span>
			<br /><br />
			I am an aspiring software developer based in {info.address.city}, {info.address.country}. This
			is a personal hub for all my projects and past experiences.
		</p>
	</section>

	<section class="grid flex-1 gap-8">
		{#if selectedTab}
			<TabSelector
				title="What are you interested in?"
				animate={selectedTab === tabNames[0]}
				bind:selected={selectedTab}
				tabs={tabs.map((t) => ({ name: t, value: t }))}
			/>
		{/if}

		{#await Promise.all( [listTechProjects(), listDesignProjects()] ) then [techProjects, designProjects]}
			{@const tab = page.url.searchParams.get("tab")}
			{#if tab === "Tech"}
				<TechProjectList projects={techProjects} />
			{:else if tab === "Design"}
				<DesignProjectList projects={designProjects} />
			{/if}
		{/await}
	</section>
</main>
