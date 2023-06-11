<script lang="ts">
  import { NotificationKind } from '@whizzes/svelte-notifications';
  import classNames from 'classnames';
  import Check from '~icons/mdi/check';
  import Close from '~icons/mdi/close';
  import Warning from '~icons/mdi/warning';

  import type { Notification } from '@whizzes/svelte-notifications';

  export let notification: Notification;

  let notificationClass: string;
  let figureClass: string;

  $: {
    notificationClass = classNames(
      'flex gap-4 bg-white text-gray-600 shadow-lg p-4 rounded-md min-w-[200px] max-w-[350px] z-10',
      notification.kind === NotificationKind.Success && '',
      notification.kind === NotificationKind.Warning && '',
      notification.kind === NotificationKind.Failure && ''
    );

    figureClass = classNames(
      'flex justify-center items-center h-10 w-10 rounded-full',
      notification.kind === NotificationKind.Success &&
        'text-white bg-green-400',
      notification.kind === NotificationKind.Warning &&
        'text-white bg-amber-400 ',
      notification.kind === NotificationKind.Failure && 'text-white bg-red-400'
    );
  }
</script>

<li class={notificationClass}>
  <div class="flex space-x-4">
    <figure class={figureClass}>
      {#if notification.kind === NotificationKind.Success}
        <Check class="h-6 w-6" />
      {:else if notification.kind === NotificationKind.Warning}
        <Warning class="h-6 w-6" />
      {:else}
        <Close class="h-6 w-6" />
      {/if}
    </figure>
  </div>
  <div class="flex flex-col">
    <span class="font-semibold">{notification.title}</span>
    <p>{notification.message}</p>
  </div>
</li>
