<script lang="ts">
  import Close from '~icons/mdi/close';
  import Hamburger from '~icons/mdi/menu';

  import Profile from './Profile.svelte';
  import Upload from './Upload.svelte';

  let isMobileMenuOpen = false;

  const toggleMobileMenu = () => (isMobileMenuOpen = !isMobileMenuOpen);
</script>

<nav class="z-30 w-full h-[64px] bg-gray-900 border-b border-gray-700">
  <div class="px-3 py-3 lg:px-5 lg:pl-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start">
        <button
          class="p-2 text-gray-300 rounded cursor-pointer lg:hidden hover:text-gray-100 hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:ring-gray-100"
          on:click={toggleMobileMenu}
        >
          {#if isMobileMenuOpen}
            <Close class="h-6 w-6" />
          {:else}
            <Hamburger class="h-6 w-6" />
          {/if}
        </button>
        <a href="/" class="flex ml-2 md:mr-24">
          <span
            class="self-center text-white text-xl font-semibold sm:text-2xl whitespace-nowrap"
            >Cloudhub</span
          >
        </a>
      </div>
      <div class="flex md:space-x-24 items-center">
        <div class="hidden md:block">
          <Upload />
        </div>
        <Profile />
      </div>
    </div>
  </div>
</nav>
