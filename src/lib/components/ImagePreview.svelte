<script lang="ts">
  import { clickOutside } from "$lib/actions/click-outside.svelte";
  import type { HTMLImgAttributes } from "svelte/elements";

  type Props = {
    onclose: () => void;
    imgProps: HTMLImgAttributes | undefined;
    show: boolean;
  };

  let { imgProps, show, onclose, ...rest }: Props = $props();

  let dialogElement = $state<HTMLDivElement>();

  $effect(() => {
    // show ? dialogElement?.showModal() : dialogElement?.close();
  });
</script>

<div
  {...rest}
  {onclose}
  bind:this={dialogElement}
  class:open={show}
  class="dialog hidden fixed flex-col gap-4 items-center justify-center w-screen h-screen top-0 left-0 cursor-pointer bg-black/75 [.open]:flex"
>
  <span class="text-text">{imgProps?.alt}</span>
  <img
    src={imgProps?.src}
    alt={imgProps?.alt}
    use:clickOutside
    onclickoutside={onclose}
    class="h-[512px] cursor-default"
  />
</div>
