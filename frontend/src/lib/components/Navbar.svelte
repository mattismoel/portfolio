<script lang="ts">
  import { page } from "$app/state";
  import { scrollY } from "svelte/reactivity/window";

  type Props = {
    entries: Map<string, string>;
  };

  const { entries }: Props = $props();
</script>

<nav
  class="z-50 w-screen fixed px-auto bg-zinc-950 text-zinc-50 flex justify-end after:shadow-2xl after:shadow-zinc-950 after:content-[''] after:block after:h-full after:absolute after:top-0 after:right-0 after:w-screen after:pointer-events-none border-b border-b-transparent [.active]:border-zinc-800 transition-colors"
  class:active={scrollY.current && scrollY.current > 0}
>
  <ul class="flex">
    {#each entries as [path, name]}
      {@render navEntry(path, name)}
    {/each}
  </ul>
</nav>

{#snippet navEntry(path: string, name: string)}
  {@const isCurrentPath = page.url.pathname === path}
  <li class="group" class:current={isCurrentPath}>
    <a
      href={path}
      class="block py-4 px-3 hover:bg-zinc-900 group-[.current]:underline group-[.current]:decoration-text"
      >{name}</a
    >
  </li>
{/snippet}
