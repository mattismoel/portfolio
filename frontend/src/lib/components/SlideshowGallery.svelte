<script lang="ts">
  import type { HTMLImgAttributes } from "svelte/elements";
  import BorderedImage from "./BorderedImage.svelte";
  import Icon from "@iconify/svelte";
  import GalleryButton from "./GalleryButton.svelte";
  import ImagePreview from "./ImagePreview.svelte";

  type Props = {
    imgsSrcs: { src: string; alt: string }[];
  };

  const { imgsSrcs }: Props = $props();

  let previewImgProps = $state<HTMLImgAttributes>();
  let showPreview = $state(false);

  let el = $state<HTMLDivElement>();

  let scrollLeft = $state(0);

  let scrollSize = $derived.by(() => {
    if (!el) return 0;
    return el.scrollWidth / imgsSrcs.length;
  });

  let scrollIdx = $derived.by(() => {
    if (!el) return 0;
    const ratio = scrollLeft / el.scrollWidth;
    return Math.floor(ratio * imgsSrcs.length);
  });

  const previewImage = (idx: number) => {
    previewImgProps = imgsSrcs[idx];
    console.log(previewImgProps);
    showPreview = true;
  };

  const scrollInDirection = (direction: number) => {
    if (!el) return;
    const nextIdx = scrollIdx + direction;
    if (nextIdx >= imgsSrcs.length) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    let newScrollPos = el.scrollLeft + direction * scrollSize;
    el.scrollTo({ left: newScrollPos, behavior: "smooth" });
  };
</script>

<div class="relative">
  <GalleryButton
    disabled={scrollIdx === 0}
    class="cursor-pointer absolute top-1/2 left-0 -translate-x-16 -translate-y-1/2 transition-opacity"
    onclick={() => scrollInDirection(-1)}
  >
    <Icon icon="fa7-solid:chevron-left" />
  </GalleryButton>
  <GalleryButton
    disabled={scrollIdx === imgsSrcs.length - 1}
    class="absolute top-1/2 -translate-y-1/2 right-0 translate-x-16 transition-opacity"
    onclick={() => scrollInDirection(1)}
  >
    <Icon icon="fa7-solid:chevron-right" />
  </GalleryButton>

  <div
    class="flex gap-4 overflow-x-scroll snap-x snap-mandatory"
    bind:this={el}
    onscroll={(e) => (scrollLeft = e.currentTarget.scrollLeft)}
  >
    {#each imgsSrcs as { src, alt }, i}
      <BorderedImage
        {src}
        {alt}
        onclick={() => previewImage(i)}
        class="snap-center shrink-0 w-full aspect-video rounded-sm brightness-100 hover:brightness-110 transition-[filter] cursor-pointer"
      />
    {/each}
  </div>
</div>

<ImagePreview
  imgProps={previewImgProps}
  onclose={() => (showPreview = false)}
  show={showPreview}
/>

<!-- <dialog bind:this={previewDialog} class="cursor-pointer"> -->
<!--   <img -->
<!--     use:clickOutside -->
<!--     onclickoutside={closePreview} -->
<!--     src={previewSrc} -->
<!--     alt="" -->
<!--     class="h-[650px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-default" -->
<!--   /> -->
<!-- </dialog> -->
