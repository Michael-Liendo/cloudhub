<script lang="ts">
  import { newForm } from '@whizzes/svelte-forms';
  import * as Yup from 'yup';

  import Button from '$lib/components/Button.svelte';
  import TextField from '../../../lib/components/TextField.svelte';

  const { handleSubmit, values, errors, isSubmitting } = newForm({
    initialValues: {
      name: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    },
    /* todo: better validations */
    validationSchema: Yup.object({
      name: Yup.string().required(),
      lastName: Yup.string().required(),
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit(values, helpers) {
      setTimeout(() => {
        console.log(values, helpers);
      }, 2000);
    },
  });
</script>

<svelte:head>
  <title>Sign up</title>
</svelte:head>

<h1 class="font-medium text-4xl md:text-5xl w-max">Sign Up | CloudHub</h1>
<form on:submit={handleSubmit} class="mt-10">
  <div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
      <TextField
        label="First Name"
        name="name"
        type="text"
        placeholder="John"
        bind:value={$values.name}
        error={$errors.name}
      />
    </div>
    <div>
      <TextField
        label="Last Name"
        name="lastName"
        type="text"
        placeholder="Doe"
        bind:value={$values.lastName}
        error={$errors.lastName}
      />
    </div>
  </div>
  <div class="mb-6">
    <TextField
      label="Username"
      name="username"
      type="username"
      placeholder="johndoe"
      bind:value={$values.username}
      error={$errors.username}
    />
  </div>
  <div class="mb-6">
    <TextField
      label="Email address"
      name="email"
      type="email"
      placeholder="john.doe@company.com"
      bind:value={$values.email}
      error={$errors.email}
    />
  </div>
  <div class="mb-10">
    <TextField
      label="Password"
      name="password"
      type="password"
      placeholder="* * * * * * * * *"
      bind:value={$values.password}
      error={$errors.password}
    />
  </div>

  <Button disabled={$isSubmitting} type="submit" fullWidth>Sign up</Button>
</form>

<div class="text-right">
  <span>Don't have an account?</span>
  <a href="/login" class="font-medium text-blue-500 hover:underline">Log in</a>
</div>
