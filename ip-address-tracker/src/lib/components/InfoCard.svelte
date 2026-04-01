<script lang="ts">
  import type { GeoData } from "../api";

  interface Props {
    data: GeoData | null;
  }

  let { data }: Props = $props();

  let locationText = $derived(
    data
      ? `${data.location.city}, ${data.location.region} ${data.location.postalCode}`
      : ""
  );

  let timezoneText = $derived(data ? `UTC ${data.location.timezone}` : "");
</script>

<div
  class="bg-white rounded-[15px] shadow-[0px_50px_50px_0px_rgba(0,0,0,0.1)] w-full max-w-[1111px] p-6 md:p-8 z-10"
>
  {#if data}
    <div
      class="flex flex-col md:flex-row md:items-start gap-6 md:gap-0 text-center md:text-left"
    >
      <!-- IP Address -->
      <div class="flex-1 md:px-8 md:first:pl-0 md:last:pr-0 md:border-r md:border-black/15">
        <p
          class="font-rubik font-bold text-[10px] md:text-xs tracking-[1.75px] text-gray-950/50 uppercase"
        >
          IP Address
        </p>
        <p
          class="font-rubik font-medium text-xl md:text-[26px] text-gray-950 tracking-[-0.25px] mt-2 md:mt-4 leading-none"
        >
          {data.ip}
        </p>
      </div>

      <!-- Location -->
      <div class="flex-1 md:px-8 md:border-r md:border-black/15">
        <p
          class="font-rubik font-bold text-[10px] md:text-xs tracking-[1.75px] text-gray-950/50 uppercase"
        >
          Location
        </p>
        <p
          class="font-rubik font-medium text-xl md:text-[26px] text-gray-950 tracking-[-0.25px] mt-2 md:mt-4 leading-none"
        >
          {locationText}
        </p>
      </div>

      <!-- Timezone -->
      <div class="flex-1 md:px-8 md:border-r md:border-black/15">
        <p
          class="font-rubik font-bold text-[10px] md:text-xs tracking-[1.75px] text-gray-950/50 uppercase"
        >
          Timezone
        </p>
        <p
          class="font-rubik font-medium text-xl md:text-[26px] text-gray-950 tracking-[-0.25px] mt-2 md:mt-4 leading-none"
        >
          {timezoneText}
        </p>
      </div>

      <!-- ISP -->
      <div class="flex-1 md:px-8 md:last:pr-0">
        <p
          class="font-rubik font-bold text-[10px] md:text-xs tracking-[1.75px] text-gray-950/50 uppercase"
        >
          ISP
        </p>
        <p
          class="font-rubik font-medium text-xl md:text-[26px] text-gray-950 tracking-[-0.25px] mt-2 md:mt-4 leading-none"
        >
          {data.isp}
        </p>
      </div>
    </div>
  {:else}
    <div class="flex flex-col md:flex-row gap-6 md:gap-0 text-center md:text-left">
      {#each ["IP Address", "Location", "Timezone", "ISP"] as label}
        <div class="flex-1 md:px-8 md:first:pl-0 md:last:pr-0 {label !== 'ISP' ? 'md:border-r md:border-black/15' : ''}">
          <p
            class="font-rubik font-bold text-[10px] md:text-xs tracking-[1.75px] text-gray-950/50 uppercase"
          >
            {label}
          </p>
          <div class="mt-2 md:mt-4 h-7 bg-gray-200 rounded animate-pulse"></div>
        </div>
      {/each}
    </div>
  {/if}
</div>
