<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  let { children, ...rest }: HTMLButtonAttributes = $props();
</script>

<button
  {...rest}
  class={[
    "px-3 py-2 bg-zinc-950 border border-zinc-900 rounded-sm hover:border-zinc-800 hover:bg-zinc-900 cursor-pointer disabled:opacity-0 disabled:cursor-default",
    rest.class,
  ]}
>
  {@render children?.()}
</button>
