<script lang="ts">
	import PersonalInfoCard from "$lib/components/PersonalInfoCard.svelte";
	import { info, socials } from "$lib/personal";
	import TechProjectList from "$lib/components/TechProjectList.svelte";
	import TabSelector from "$lib/components/TabSelector.svelte";
    import { listTechProjects } from "$lib/project.remote";

	const tabNames = ["Tech", "Graphic Design"] as const;
	type TabType = (typeof tabNames)[number];

	const tabs: TabType[] = ["Tech", "Graphic Design"];
	let selectedTab = $state<TabType>("Tech");

	const isValidTabName = (tabName: string): tabName is TabType => {
		const validTab = tabNames.find((n) => n === tabName);
		if (!validTab) return false;
		return true;
	};
</script>

<svelte:head>
	<title>Mattis Møl Kristensen | Home page</title>
	<meta name="description" content="The home page of Mattis Møl Kristensen" />
</svelte:head>

<main class="min-h-svh px-auto py-32 flex flex-col gap-20">
	<section class="flex flex-col gap-16">
		<PersonalInfoCard {info} {socials} />
		<p class="leading-relaxed">
			<span class="font-semibold text-heading">
				Hi! My name is {info.firstName}.
			</span>
			<br /><br />
			I am an aspiring software developer based in Copenhagen, Denmark. This is a personal
			hub for all my projects - both finished, and in progress.
			<br /><br />
			Look around, and please do peek into the projects, and let me know if you find
			something of interest!
		</p>
	</section>
	<section class="flex flex-1 flex-col gap-8">
		<!-- <h1 class="text-2xl mb-10 font-bold text-heading" id="projects"> -->
		<!--   "Well, what have you been up to?", you ask... -->
		<!-- </h1> -->

		<TabSelector
			{tabs}
			onSelect={(newTab) =>
				(selectedTab = isValidTabName(newTab) ? newTab : "Graphic Design")}
			selected={selectedTab}
		/>

    {#await listTechProjects() then techProjects}
		{#if selectedTab === "Tech"}
			<TechProjectList projects={techProjects} />
		{:else if selectedTab === "Graphic Design"}
        Hello
			<!-- <GraphicProjectList projects={graphicPs} /> -->
		{/if}
{/await}
	</section>
</main>
