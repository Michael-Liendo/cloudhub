<script lang="ts">
  import { page } from '$app/stores';
  import ItemTable from './ItemTable.svelte';
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <caption
      class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
    >
      Files uploads
      <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
        See and download your files
      </p>
    </caption>
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    >
      <tr>
        <th scope="col" class="px-6 py-3"> File name </th>
        <th scope="col" class="px-6 py-3"> Size </th>
        <th scope="col" class="px-6 py-3"> Upload date </th>
        <th scope="col" class="px-6 py-3">
          <span class="sr-only">Menu</span>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each $page.data.files ?? [] as file}
        <ItemTable {file} />
      {/each}
    </tbody>
  </table>
</div>
