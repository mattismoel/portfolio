<script lang="ts">
  import PersonalInfoCard from "$lib/components/PersonalInfoCard.svelte";
  import { info, socials } from "$lib/personal";
  import {
    techProjects,
    sortProjectsByFinishDate,
    graphicsProjects,
  } from "$lib/project";
  import TechProjectList from "$lib/components/TechProjectList.svelte";
  import GraphicProjectList from "$lib/components/GraphicProjectList.svelte";
  import TabSelector from "$lib/components/TabSelector.svelte";

  const tabNames = ["Tech", "Graphic Design"] as const;
  type TabType = (typeof tabNames)[number];

  const tabs: TabType[] = ["Tech", "Graphic Design"];
  let selectedTab = $state<TabType>("Tech");

  const isValidTabName = (tabName: string): tabName is TabType => {
    const validTab = tabNames.find((n) => n === tabName);
    if (!validTab) return false;
    return true;
  };

  let techPs = $derived(sortProjectsByFinishDate(techProjects));
  let graphicPs = $derived(sortProjectsByFinishDate(graphicsProjects));
</script>

<main class="min-h-svh px-auto py-32 flex flex-col gap-20">
  <section class="flex flex-col gap-16">
    <PersonalInfoCard {info} {socials} />
    <p class="leading-relaxed">
      <span class="font-semibold text-heading">
        Hi! My name is {info.firstName}.
      </span>
      <br /><br />
      I am an aspiring software developer from Odense, Denmark. This is a personal
      hub for all my projects - both finished, and in progress.
      <br /><br />
      Look around, and please do peek into the projects, and let me know if you find
      something of interest!
    </p>
  </section>
  <section class="flex flex-1 flex-col gap-4">
    <!-- <h1 class="text-2xl mb-10 font-bold text-heading" id="projects"> -->
    <!--   "Well, what have you been up to?", you ask... -->
    <!-- </h1> -->

    <TabSelector
      {tabs}
      onSelect={(newTab) =>
        (selectedTab = isValidTabName(newTab) ? newTab : "Graphic Design")}
      selected={selectedTab}
    />

    {#if selectedTab === "Tech"}
      <TechProjectList projects={techPs} />
    {:else if selectedTab === "Graphic Design"}
      <GraphicProjectList projects={graphicPs} />
    {/if}
  </section>
</main>
