<script lang="ts">
  import type { GraphicsProject } from "$lib/project";
  import type { HTMLImgAttributes } from "svelte/elements";
  import ImagePreview from "./ImagePreview.svelte";
  import { format } from "date-fns";

  type Props = {
    project: GraphicsProject;
  };

  const { project }: Props = $props();

  let previewProps = $state<HTMLImgAttributes>();
  let showPreview = $state(false);

  const previewImage = (idx: number) => {
    previewProps = project.imageSrcs.at(idx);
    showPreview = true;
  };
</script>

<div class="@container flex flex-col gap-8 py-16 first:pt-0 last:pb-0">
  <div>
    <h2 class="font-semibold text-heading">{project.title}</h2>
    {#if project.finishDate}
      <span>{format(project.finishDate, "MMMM yyyy")}</span>
    {/if}
  </div>

  <div class="flex flex-col gap-4">
    <div
      class="flex flex-col justify-center gap-8 xl:gap-16 xl:justify-between xl:flex-row-reverse"
    >
      <p class="text-left xl:text-right">{project.description}</p>
      <img
        onclick={() => previewImage(0)}
        src={project.imageSrcs[0].src}
        class="bg-green-500 w-full sm:w-96"
      />
    </div>
  </div>

  <ImagePreview
    imgProps={previewProps}
    show={showPreview}
    onclose={() => (showPreview = false)}
  />
</div>
