<script lang="ts">
  import { onMount } from "svelte";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";

  interface Props {
    lat: number;
    lng: number;
  }

  let { lat, lng }: Props = $props();

  let mapContainer: HTMLDivElement;
  let map: L.Map | null = null;
  let marker: L.Marker | null = null;

  const locationIcon = L.icon({
    iconUrl: "/images/icon-location.svg",
    iconSize: [46, 56],
    iconAnchor: [23, 56],
  });

  onMount(() => {
    map = L.map(mapContainer, {
      zoomControl: false,
    }).setView([lat, lng], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    marker = L.marker([lat, lng], { icon: locationIcon }).addTo(map);

    return () => {
      map?.remove();
    };
  });

  $effect(() => {
    if (map && marker) {
      map.setView([lat, lng], 14, { animate: true });
      marker.setLatLng([lat, lng]);
    }
  });
</script>

<div bind:this={mapContainer} class="w-full h-full"></div>
