<script lang="ts">
  import { page } from '$app/stores';
  import { clickOutside } from '$lib/actions/click_outside';

  let isDropdownOpen = false;

  const handleDropdownClick = () => {
    isDropdownOpen = !isDropdownOpen;
  };
</script>

<div class="flex items-center ml-3">
  <div>
    <button
      on:click={handleDropdownClick}
      type="button"
      class="flex text-sm bg-gray-900 rounded-full"
      id="user-menu-button"
      aria-expanded="false"
      data-dropdown-toggle="dropdown-2"
    >
      <span class="sr-only">Open user menu</span>
      {#if !$page.data.user?.avatar}
        <figure
          class="flex justify-center items-center bg-gray-700 w-10 h-10 rounded-full"
        >
          {$page.data.user?.first_name.charAt(0).toUpperCase()}
        </figure>
      {:else}
        <img
          src={$page.data.user?.avatar}
          alt="Avatar"
          class="w-10 h-10 object-cover rounded-full"
        />
      {/if}
    </button>
    {#if isDropdownOpen}
      <div
        use:clickOutside
        on:clickOutside={handleDropdownClick}
        id="dropdown"
        class="z-10 fixed right-5 top-14 bg-gray-800 divide-y divide-gray-700 rounded-lg shadow w-44"
      >
        <div class="px-4 py-3 text-sm text-gray-200">
          <p title={$page.data.user?.first_name} class="truncate">
            {$page.data.user?.first_name}
            {$page.data.user?.last_name}
          </p>
          <p title={$page.data.user?.email} class="font-medium truncate">
            {$page.data.user?.email}
          </p>
        </div>
        <div class="py-1">
          <a
            href="/settings"
            class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
            >Settings</a
          >
        </div>
        <div class="py-1">
          <a
            href="/logout"
            class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
            >Sign out</a
          >
        </div>
      </div>
    {/if}
  </div>
</div>
