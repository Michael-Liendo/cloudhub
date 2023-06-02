<script lang="ts">
  import classNames from 'classnames';

  export let type: 'text' | 'number' | 'email' | 'password' | 'date' = 'text';
  export let name: string;
  export let id = name;
  export let error: string | null = null;
  export let value: string | null = null;
  export let label: string | null = null;
  export let placeholder: string | undefined = undefined;
  export let required = false;
  export let autocomplete: 'true' | 'false' | undefined = undefined;
  export { customClassNames as class };

  let customClassNames = '';

  let className = classNames(
    customClassNames,
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
  );

  const handleInput = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    value = target.value;
  };
</script>

{#if label}
  <label for={id} class="block mb-2 font-medium" class:text-red-500={error}
    >{label}</label
  >
{/if}

<input
  {name}
  {id}
  {placeholder}
  {required}
  {autocomplete}
  {type}
  {value}
  class:bg-gray-700={error}
  class:border-red-500={error}
  class:text-red-900={error}
  class:placeholder-red-500={error}
  class:focus:ring-red-500={error}
  class:focus:border-red-500={error}
  class={className}
  on:change
  on:blur
  on:focus
  on:input={handleInput}
/>
{#if error}
  <p class="mt-2 text-sm text-red-500">
    {error}
  </p>
{/if}
