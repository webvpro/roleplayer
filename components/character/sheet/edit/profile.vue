<template>
  <VeeForm
    v-slot="{values, handleSubmit, handleReset}"
    :validation-schema="profileScheme"
    :initial-values="initialValues"
    class="bg-neutral text-neutral-content"
    as="div"
  >
    <form @submit.prevent="handleSubmit($event, onSubmit)" class="h-full p-6">
      <input type="submit" class="hidden" />
      <div class="join join-vertical input-bordered my-3 w-full">
        <label for="name" class="input-label">
          <span class="label-text">Name</span>
        </label>
        <VeeField
          type="text"
          name="name"
          placeholder="Type name here"
          class="join-item bg-neutral text-neutral-content"
          validate-on-change="true"
        />

        <ErrorMessage name="name" class="join-item" />
      </div>
      <div class="join join-vertical input-bordered my-3 w-full">
        <label class="input-label">
          <span class="label-text">Image URL</span>
        </label>
        <VeeField
          type="text"
          name="url"
          placeholder="Type name here"
          class="join-item bg-neutral text-neutral-content"
        />

        <ErrorMessage name="url" class="join-item" />
      </div>

      <div class="join input-bordered w-full my-3">
        <label class="input-label w-1/4">
          <span class="label-text">XP</span>
        </label>
        <VeeField
          type="number"
          name="xp"
          min="0"
          max="10"
          size="2"
          class="join-item bg-neutral text-neutral-content w-1/4"
          validate-on-change="true"
        />

        <label class="input-label w-1/4">
          <span class="label-text">Effort</span>
        </label>
        <VeeField
          type="number"
          name="effort"
          min="0"
          max="6"
          size="2"
          class="join-item bg-neutral text-neutral-content w-1/4"
          validate-on-change="true"
        />
      </div>
    </form>
  </VeeForm>
</template>

<script setup>
  import {
    useForm,
    useField,
    Field as VeeField,
    Form as VeeForm,
    ErrorMessage,
    configure,
  } from 'vee-validate';
  import * as yup from 'yup';

  const props = defineProps({
    editedBy: {type: String, default: 'owner'},
  });
  const characterUtils = utilsCharacters();
  const sheet = reactive(props.character.value);

  const toggle = ref(true);
  function onToggle(e) {
    console.log('toggle:', toggle.value);
  }

  const initialValues = computed(() => ({
    name: sheet.value.name,
    url: sheet.value.url ?? '',
    xp: sheet.value.xp ?? 0,
    effort: sheet.value.effort ?? 0,
  }));

  const emit = defineEmits(['update-character', 'close', 'open-modal']);

  function onAddTier() {
    const tierCount = characterAdvancements.value.length ?? 0;
    const currentTiers = characterAdvancements.value ?? [];
    const newTier = {
      tier: currentTiers.length + 1,
      name: 'tier',
      advancements: [],
    };
    currentTiers.push(newTier);
    console.log(tierCount, currentTiers);
    emit('update-character', {advancements: currentTiers});
  }

  function onClose() {
    emit('close');
  }

  const onSubmit = values => {
    //handleSubmit(values => {
    emit('update-character', {...values});
    console.log(values);
  };
  const changeValue = e => {
    const idx = sheet.value.pools.findIndex(pool => pool.key === e.key);
    sheet.value.pools[idx] = e;
    //console.log('pool update', sheet.pools);
    emit('update-character', {pools: sheet.pools});
  };
  const profileScheme = yup.object({
    name: yup.string().required().min(1),
    url: yup.string().url().default('').nullable(),
  });

  function handleRecoveryChange(e) {
    const cr = characterRecovery.value;
    cr[e.target.name] = parseInt(e.target.value);
    console.log(`recovery change: ${e.target.name} new value`, cr);
    emit('update-character', {recovery: cr});
  }

  const onItemClick = e => {
    const data = {
      kind: e.kind,
      action: 'edit',
      value: e.value,
    };
    //console.log(e);
    emit('open-modal', data);
  };
</script>

<style lang="postcss">
  .form-control-v {
    @apply join join-vertical input-bordered my-3;
  }
  .pool-input {
    @apply border-none w-auto m-1 bg-secondary text-secondary-content flex-1;
  }
  .input-label {
    @apply label join-item bg-primary text-primary-content;
  }
</style>
