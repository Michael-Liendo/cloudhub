<script lang="ts">
  import classNames from 'classnames';
  import EyeClosed from '~icons/mdi/eye-closed';
  import EyeOpen from '~icons/mdi/eye';

  // TODO: especial password input with a view a hidden text
  export let type: 'text' | 'number' | 'email' | 'password' | 'username' =
    'text';
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

  let viewPassword: boolean;
  function changeInputView() {
    viewPassword = !viewPassword;
  }

  const handleInput = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    value = target.value;
  };
</script>

{#if label}
  <label for={id} class="block mb-2 font-medium">{label}</label>
{/if}

{#if type == 'username'}
  <div class="flex">
    <span
      class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
    >
      @
    </span>
    <input
      {name}
      {id}
      {placeholder}
      {required}
      {autocomplete}
      {type}
      {value}
      class:rounded-none={type}
      class:rounded-r-lg={type}
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
  </div>
{:else if type == 'password'}
  <div class="relative">
    <input
      {name}
      {id}
      {placeholder}
      {required}
      {autocomplete}
      type={viewPassword ? 'text' : type}
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
    <button
      type="button"
      on:click={changeInputView}
      class="absolute inset-y-0 right-0 flex items-center pr-3"
    >
      {#if viewPassword}
        <EyeOpen />
      {:else}
        <EyeClosed />
      {/if}
    </button>
  </div>
{:else}
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
{/if}

{#if error}
  <p class="mt-0.5 text-sm text-red-500 fixed">
    {error}
  </p>
{/if}
