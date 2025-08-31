<script lang="ts">
  import type { HTMLAttributes, HTMLImgAttributes } from "svelte/elements";

  type Props = Pick<HTMLImgAttributes, "src" | "alt"> &
    HTMLAttributes<HTMLDivElement>;

  const { src, alt, ...rest }: Props = $props();
</script>

<div {...rest} class={["relative isolate shrink-0 h-full w-auto", rest.class]}>
  <img
    {src}
    {alt}
    {...rest}
    class={[
      "-z-10 absolute top-0 left-0 mix-blend-screen brightness-175 h-full w-full object-cover",
      rest.class,
    ]}
  />
  <img
    aria-hidden="true"
    {src}
    {alt}
    class={["p-[1px] h-full w-full object-cover", rest.class]}
  />
</div>
