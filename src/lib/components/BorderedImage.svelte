<script lang="ts">
  import type { HTMLAttributes, HTMLImgAttributes } from "svelte/elements";

  type Props = Pick<HTMLImgAttributes, "src" | "alt"> &
    HTMLAttributes<HTMLDivElement>;

  const { src, alt, ...rest }: Props = $props();

  const baseClasses =
    "absolute block h-full w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover";
</script>

<div
  {...rest}
  class={["relative flex items-center justify-center", rest.class]}
>
  <img
    {src}
    {alt}
    {...rest}
    class={[baseClasses, "mix-blend-screen brightness-175", rest.class]}
  />

  <img {src} {alt} class={[baseClasses, "p-[1px]", rest.class]} />
</div>
