<script>
  import { NotificationList, Position } from '@whizzes/svelte-notifications';
  import '../app.css';
  import Notification from '$lib/components/Notification.svelte';
</script>

<slot />
<NotificationList
  class="fixed top-0 right-0 mt-[54px] p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-54px)]"
  position={Position.TopRight}
  let:notification
>
  <Notification {notification} />
</NotificationList>
