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

  type TabType = "tech" | "graphic-design";

  let tabType = $state<TabType>("graphic-design");
  const tabs = new Map<TabType, string>([
    ["tech", "Tech"],
    ["graphic-design", "Graphic Design"],
  ]);

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
      I am an aspiring software developer from Odense, Denmark. This is my personal
      hub for all my projects - both finished, and in progress.
      <br /><br />
      Look around, and please do peek into the projects, and let me know if you find
      something of interest!
    </p>
  </section>
  <section class="flex-1 flex-col">
    <h1 class="text-2xl mb-10 font-bold text-heading" id="projects">
      "Well, what have you been up to?", you ask...
    </h1>

    <div class="w-full flex gap-2 mb-8">
      {#each tabs as [t, tabName]}
        <button
          class:active={tabType === t}
          class="w-full py-1 rounded-sm border border-transparent bg-zinc-950 hover:border-zinc-900 [.active]:font-bold [.active]:bg-zinc-900 transition-colors"
          onclick={() => (tabType = t)}>{tabName}</button
        >
      {/each}
    </div>

    {#if tabType === "tech"}
      <TechProjectList projects={techPs} />
    {:else if tabType === "graphic-design"}
      <GraphicProjectList projects={graphicPs} />
    {/if}
  </section>
</main>
