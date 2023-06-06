<template>
  <VeeForm
    v-slot="{values, handleSubmit, handleReset}"
    :validation-schema="profileScheme"
    :initial-values="initialValues"
    as="div"
  >
    <form @submit.prevent="handleSubmit($event, onSubmit)" class="h-full">
      <input type="submit" class="hidden" />
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Name</span>
          <VeeField
            type="text"
            name="name"
            placeholder="Type name here"
            class="input input-bordered w-full"
            validate-on-change="true"
          />
        </label>
        <ErrorMessage name="name" />
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Image URL</span>
          <VeeField
            type="text"
            name="imgURL"
            placeholder="Type name here"
            class="input input-bordered w-full"
          />
        </label>
        <ErrorMessage name="imgURL" />
      </div>
      <div class="flex flex-col lg:flex-row justify-between items-center">
        <div class="form-control">
          <label class="label">
            <span class="label-text">XP</span>
            <VeeField
              type="number"
              name="xp"
              min="0"
              max="10"
              size="2"
              class="input input-bordered w-full"
              validate-on-change="true"
            />
          </label>
          <ErrorMessage name="name" />
        </div>
        <div class="form-control">
          <label class="input-group input-group-md input-group-vertical">
            <span class="bg-primary text-primary-content">Effort</span>
            <VeeField
              type="number"
              name="effort"
              min="0"
              max="10"
              size="2"
              class="input input-bordered w-full"
              validate-on-change="true"
            />
          </label>
          <ErrorMessage name="name" />
        </div>
      </div>
      <!-- pool and edge inputs -->
      <InputPoolStats
        v-for="(pool, index) in character.pools"
        :pool-key="pool.key"
        :pool-value="pool.value"
        @pool-change="changeValue"
      />
      <div class="divider"></div>

      <h2>Sentence</h2>

      <div class="form-control w-full">
        <label class="input-group input-group-md input-group-vertical">
          <span class="bg-primary text-primary-content">Descriptor</span>
          <VeeField
            v-slot="{values}"
            name="descriptor"
            as="select"
            class="select select-bordered w-full max-w-full"
            validate-on-change="true"
          >
            <option value="">Select Descriptor</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </VeeField>
        </label>
        <ErrorMessage name="name" />
      </div>
      <div class="form-control w-full">
        <label class="input-group input-group-md input-group-vertical">
          <span class="bg-primary text-primary-content">Sub Descriptor</span>
          <VeeField
            v-slot="{values}"
            name="sub_descriptor"
            as="select"
            class="select select-bordered w-full max-w-xs"
            validate-on-change="true"
          >
            <option value="">Select Descriptor</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </VeeField>
        </label>
        <ErrorMessage name="name" />
      </div>
      <div class="form-control w-full">
        <label class="input-group input-group-md input-group-vertical">
          <span class="bg-primary text-primary-content">Type</span>
          <VeeField
            v-slot="{values}"
            name="type"
            as="select"
            class="select select-bordered w-full max-w-xs"
            validate-on-change="true"
          >
            <option value="">Select Type</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </VeeField>
        </label>
        <ErrorMessage name="name" />
      </div>

      <!-- button form controls -->
      <div class="fixed bottom-3 right-6 btn-group btn-group-horizontal">
        <button class="btn" @click.prevent="handleReset">Reset</button>
        <button class="btn" @click="onClose">Close</button>
        <button name="submit" type="Submit" class="btn btn-active">Save</button>
      </div>
    </form>
    <pre>{{ compendium.collections.type }}</pre>
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
    character: {type: Object, default: () => {}},
    compendium: {type: Object, default: () => {}},
    editedBy: {type: String, default: 'owner'},
  });
  const toggle = ref(true);
  function onToggle(e) {
    console.log('toggle:', toggle.value);
  }
  const {value: name} = useField('name');
  const {value: imgURL} = useField('imgURL');

  const initialValues = {
    name: props.character.name,
    imgURL: props.character.url ?? '',
    xp: props.character.xp ?? 0,
    effort: props.character.effort ?? 0,
  };

  const emit = defineEmits(['update-character', 'close']);

  function onClose() {
    emit('close');
  }

  const onSubmit = values => {
    //handleSubmit(values => {
    emit('update-character', {...{values}, scope: 'profile'});
    //console.log(vals);
  };
  const changeValue = e => {
    console.log(e);
  };
  const profileScheme = yup.object({
    name: yup.string().required().min(1),
    imgURL: yup.string().url().default('').nullable(),
  });
</script>

<style lang="postcss">
  .form-control {
    @apply mx-auto my-3;
  }
  .pool-input {
    @apply border-none w-auto m-1 bg-neutral text-neutral-content flex-1;
  }
  .profile-input {
    @apply input-group input-group-md input-group-vertical;
  }
</style>
