<script lang="ts">
  import { newForm } from '@whizzes/svelte-forms';
  import * as Yup from 'yup';

  import Button from '$lib/components/Button.svelte';
  import TextField from '../../../lib/components/TextField.svelte';

  const { handleSubmit, values, errors, isSubmitting } = newForm({
    initialValues: {
      username: '',
      password: '',
    },
    /* todo: better validations */
    validationSchema: Yup.object({
      username: Yup.string().required(),
      password: Yup.string().required(),
    }),
    onSubmit(values, helpers) {
      // TODO: login
    },
  });
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<h1 class="font-medium text-4xl md:text-5xl w-max">Log In | CloudHub</h1>
<form on:submit={handleSubmit} class="mt-10">
  <div class="mb-6">
    <TextField
      label="Username"
      name="username"
      type="text"
      placeholder="john.doe@company.com"
      bind:value={$values.username}
      error={$errors.username}
    />
  </div>
  <div class="mb-10 relative">
    <TextField
      label="Password"
      name="password"
      type="password"
      placeholder="* * * * * * *"
      bind:value={$values.password}
      error={$errors.password}
    />
    <a
      href="#todo"
      class="font-medium absolute right-0 text-blue-500 hover:underline"
      >Forgot password?</a
    >
  </div>

  <Button disabled={$isSubmitting} type="submit" fullWidth>Log in</Button>
</form>

<div class="text-right">
  <span>Don't have an account?</span>
  <a href="/signup" class="font-medium text-blue-500 hover:underline">Sign up</a
  >
</div>
