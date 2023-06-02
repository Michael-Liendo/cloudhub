<script lang="ts">
  import classNames from 'classnames';

  export let type: 'button' | 'submit' = 'button';
  export let fullWidth = false;
  export let disabled = false;

  let customClassNames = '';
  export { customClassNames as class };

  let className = classNames(
    customClassNames,
    'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700',
    {
      'w-full': fullWidth,
      '!cursor-not-allowed !opacity-50 !bg-gray-700 !text-white': disabled,
    }
  );
</script>

<button {type} class={className} {disabled} on:click>
  <slot />
</button>
