<script lang="ts">
  import classNames from 'classnames';

  let className = '';
  export { className as class };
</script>

<div
  class={classNames(
    'p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700',
    className
  )}
>
  <slot />
</div>

<style>
  @media (max-width: 767px) {
    .bg-gradient-card {
      background: radial-gradient(#1d3044, #21252c);
    }
  }
</style>
