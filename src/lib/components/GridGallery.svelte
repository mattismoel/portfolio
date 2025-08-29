<script lang="ts">
  import type { HTMLImgAttributes } from "svelte/elements";
  import ImagePreview from "./ImagePreview.svelte";
  import BorderedImage from "./BorderedImage.svelte";

  type Props = {
    srcs: HTMLImgAttributes[];
    class?: string;
  };

  let { srcs, ...rest }: Props = $props();

  let previewProps = $state<HTMLImgAttributes>();
  let showPreview = $state(false);

  const previewImage = (idx: number) => {
    previewProps = srcs.at(idx);
    showPreview = true;
  };
</script>

<div
  class={[
    "grid @lg:grid-cols-2 @2xl:grid-cols-2 @3xl:grid-cols-3 flex-wrap gap-4 min-h-16 justify-center",
    rest.class,
  ]}
>
  {#each srcs as { src, alt }, i}
    <BorderedImage
      {src}
      {alt}
      onclick={() => previewImage(i)}
      class="hover:brightness-110 cursor-pointer w-fit"
    />
  {/each}
</div>

<ImagePreview
  imgProps={previewProps}
  show={showPreview}
  onclose={() => (showPreview = false)}
/>
