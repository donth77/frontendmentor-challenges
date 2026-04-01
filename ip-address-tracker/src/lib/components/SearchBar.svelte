<script lang="ts">
  interface Props {
    onSearch: (query: string) => void;
    disabled?: boolean;
  }

  let { onSearch, disabled = false }: Props = $props();
  let query = $state("");

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }
</script>

<form
  onsubmit={handleSubmit}
  class="flex w-full max-w-[555px] h-[58px] rounded-[15px] shadow-[0px_50px_50px_0px_rgba(0,0,0,0.1)] overflow-hidden"
>
  <input
    type="text"
    bind:value={query}
    onkeydown={handleKeydown}
    placeholder="Search for any IP address or domain"
    {disabled}
    class="flex-1 px-6 text-lg text-gray-950 font-rubik font-normal placeholder:text-gray-400 outline-none cursor-pointer bg-white"
  />
  <button
    type="submit"
    {disabled}
    class="w-[58px] h-[58px] bg-black hover:bg-gray-800 flex items-center justify-center shrink-0 cursor-pointer transition-colors disabled:opacity-50"
    aria-label="Search"
  >
    <img src="/images/icon-arrow.svg" alt="" width="11" height="14" />
  </button>
</form>
