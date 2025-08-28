<script lang="ts">
  import type { TechProject } from "$lib/project";
  import {
    technologyMap,
    type Technology,
    type TechnologyName,
  } from "$lib/technology";
  import Icon from "@iconify/svelte";
  import Gallery from "./Gallery.svelte";

  type Props = {
    project: TechProject;
  };

  let { project }: Props = $props();
</script>

<div
  class="@container flex flex-col gap-8 py-16 first:pt-0 last:pb-0"
  role="presentation"
>
  <div class="flex flex-col gap-4 md:flex-row md:justify-between">
    <div>
      <a
        href={project.url}
        title={project.title}
        target="__blank"
        class="text-heading font-semibold flex gap-2 items-baseline hover:underline"
      >
        <h2>{project.title}</h2>
        <Icon icon="fa7-solid:external-link" class="text-text/50" />
      </a>
      <span>{project.finishDate?.getFullYear()}</span>
    </div>

    <div class="hidden @2xl:block">
      {@render techList(project.techologies)}
    </div>
  </div>
  <p>{project.description}</p>

  <div class="flex flex-col gap-4 @2xl:hidden">
    <span class="text-xs text-center">Built with</span>
    {@render techList(project.techologies)}
  </div>

  <Gallery imgsSrcs={project.imageSrcs} />
</div>

{#snippet techIcon(technology: Technology)}
  <a href={technology.url} title={technology.name} class="group">
    {#if technology.iconName}
      <Icon
        class="*:fill-text/35 group-hover:*:fill-text"
        height="24"
        icon={technology.iconName}
      />
    {:else}
      <technology.Icon class="w-6 fill-text/35 group-hover:fill-text" />
    {/if}
  </a>
{/snippet}

{#snippet techList(technologies: TechnologyName[])}
  <ul class="flex flex-wrap items-center gap-6 justify-center">
    {#each technologies as techName}
      {@const technology = technologyMap[techName]}
      {@render techIcon(technology)}
    {/each}
  </ul>
{/snippet}
