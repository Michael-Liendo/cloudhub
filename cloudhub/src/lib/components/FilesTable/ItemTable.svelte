<script lang="ts">
  import { formatBytes } from '$lib/utils/formatBytes';
  import type { FileDetails } from '../../../app';
  import Menu from './Menu.svelte';

  export let file: FileDetails;
</script>

<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
  <th
    scope="row"
    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  >
    {file.name}
  </th>
  <td class="px-6 py-4">{formatBytes(file.size)}</td>
  <td class="px-6 py-4"
    >{new Date(file.createdAt).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })}</td
  >
  <td class="px-6 py-4 text-right">
    <Menu />
  </td>
</tr>
