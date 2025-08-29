<script lang="ts">
  import type { PersonalInformation, Social } from "$lib/personal";
  import Icon from "@iconify/svelte";
  import { differenceInYears } from "date-fns";
  import BorderedImage from "./BorderedImage.svelte";

  type Props = {
    info: PersonalInformation;
    socials: Social[];
  };

  const { info, socials }: Props = $props();
  const age = $derived(differenceInYears(new Date(), info.birthday));
</script>

<div class="flex">
  <div class="h-28 md:h-32">
    <BorderedImage src={info.pictureUrl} class="aspect-square rounded-full" />
  </div>
  <div class="flex w-full flex-col items-end gap-4">
    <div class="flex flex-col items-end">
      <span class="text-heading">{info.firstName} {info.lastName}</span>
      <span class="text-text/75">
        {info.address.city}, {info.address.country}
      </span>
      <span class="text-text/75">{age} years old</span>
    </div>

    <ul class="flex gap-4">
      {#each socials as social}
        {@render socialEntry(social)}
      {/each}
    </ul>
  </div>
</div>

{#snippet socialEntry(social: Social)}
  <li class="flex items-center gap-2">
    <a
      title={social.name}
      href={social.url}
      target="__blank"
      aria-label={social.name}
      class="text-text/50 hover:text-text"
    >
      <Icon icon={social.iconName} width="20" />
    </a>
  </li>
{/snippet}
