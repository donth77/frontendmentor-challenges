<script lang="ts">
  import { onMount } from "svelte";
  import SearchBar from "./lib/components/SearchBar.svelte";
  import InfoCard from "./lib/components/InfoCard.svelte";
  import Map from "./lib/components/Map.svelte";
  import { fetchGeoData, type GeoData } from "./lib/api";

  let geoData: GeoData | null = $state(null);
  let error: string | null = $state(null);
  let loading = $state(true);
  let lat = $state(51.505);
  let lng = $state(-0.09);

  async function search(query?: string) {
    loading = true;
    error = null;
    try {
      const data = await fetchGeoData(query);
      geoData = data;
      lat = data.location.lat;
      lng = data.location.lng;
    } catch (e) {
      error = e instanceof Error ? e.message : "An error occurred";
    } finally {
      loading = false;
    }
  }

  function handleSearch(query: string) {
    search(query);
  }

  onMount(() => {
    search();
  });
</script>

<main class="relative h-full w-full font-rubik">
  <!-- Header with background pattern -->
  <div
    class="relative h-[300px] md:h-[280px] bg-cover bg-center bg-no-repeat"
    style="background-image: url('/images/pattern-bg-mobile.png');"
  >
    <!-- Desktop background -->
    <div
      class="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('/images/pattern-bg-desktop.png');"
    ></div>

    <!-- Content overlay -->
    <div
      class="relative z-10 flex flex-col items-center gap-6 md:gap-7 pt-[26px] md:pt-[33px] px-6"
    >
      <h1
        class="font-rubik font-medium text-[26px] md:text-[32px] text-white tracking-[-0.25px] leading-none"
      >
        IP Address Tracker
      </h1>

      <SearchBar onSearch={handleSearch} disabled={loading} />
    </div>
  </div>

  <!-- Info card - positioned to overlap header and map -->
  <div
    class="absolute left-1/2 -translate-x-1/2 top-[170px] md:top-[165px] z-20 w-[calc(100%-48px)] max-w-[1111px] flex justify-center"
  >
    <InfoCard data={geoData} />
  </div>

  <!-- Error message -->
  {#if error}
    <div
      class="absolute left-1/2 -translate-x-1/2 top-[320px] md:top-[280px] z-30 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-lg text-center text-sm"
    >
      {error}
    </div>
  {/if}

  <!-- Map -->
  <div class="absolute top-[300px] md:top-[280px] bottom-0 left-0 right-0 z-0">
    <Map {lat} {lng} />
  </div>
</main>
