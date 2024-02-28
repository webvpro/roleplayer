<script setup>
  import {array, object, string} from 'yup';
  import {toTypedSchema} from '@vee-validate/yup';
  const emit = defineEmits(['onSubmit']);
  const allowedSeeds = ['CSRD'];
  const selectedSeeds = ['CSRD'];
  const props = defineProps({
    formValues: {
      type: Object,
      default: {},
    },
  });
  const formVal = computed(() => props.formValues);
  const {defineField, values, handleSubmit, isSubmitting, errors} = useForm({
    initialValues: formVal.value,
    validationSchema: toTypedSchema(
      object({
        name: string().min(4).required(),
        description: string(),
      }),
    ),
  });
  const {
    remove: removeSeed,
    push: pushSeed,
    fields: seeds,
  } = useFieldArray('seeds');
  const onSubmit = handleSubmit(values => {
    if (values) {
      if (values.description) {
        values.description = values.description.replace(/(<([^>]+)>)/gi, '');
      }
      emit('onSubmit', values);
    }
  });
  function onSeedToggle(event, idx) {
    console.log('onSeedEvent', event.target.value);
    event.target.blur();
    const seed = event.target.value;
    if (event.target.checked) {
      console.log(`push seed`);
      pushSeed(seed);
    } else {
      const seedIdx = Array.from(values.seeds).findIndex(
        seed => seed === event.target.value,
      );
      console.log(`remove ${event.target.value}`, seedIdx);
      removeSeed(seedIdx);
    }
  }

  const [name, nameAttrs] = defineField('name');
  const [description, descriptionAttrs] = defineField('description');
</script>
<template>
  <form @submit="onSubmit">
    <div class="p-2 md:p-6 mb-2">
      <label class="form-control w-full p-1">
        <div class="label">
          <span class="label-text">Name</span>
        </div>
        <input
          type="text"
          v-model="name"
          v-bind="nameAttrs"
          placeholder="Type here"
          class="input input-bordered text-base-content w-full"
        />
        <div class="label" v-if="errors.name">
          <span class="label-text text-error capitalize">{{
            errors.name
          }}</span>
        </div>
      </label>
      <label class="form-control p-1">
        <div class="label">
          <span class="label-text capitalize">description</span>
        </div>
        <textarea
          v-model="description"
          v-bind="descriptionAttrs"
          class="textarea textarea-bordered h-64 text-base-content"
          placeholder="Bio"
        ></textarea>
        <div class="label bg-info text-info-content">
          <span class="label-text capitalize">Html tags will be removed</span>
        </div>
      </label>
      <div v-for="(seed, idx) in allowedSeeds" class="form-control w-full p-3">
        <label class="cursor-pointer label">
          <span class="label-text">Import {{ seed }}</span>
          <input
            :name="`seed-toggle-${seed}`"
            type="checkbox"
            class="toggle toggle-warning checked:toggle-success"
            :value="seed"
            :checked="!!seeds[idx]"
            :disabled="seed === 'CSRD'"
            @change="event => onSeedToggle(event, idx)"
          />
        </label>
      </div>
    </div>
    <div class="btm-nav">
      <button
        type="submit"
        class="bg-success text-success-content"
        :disabled="Object.keys(errors).length > 0"
        @click="onSubmit"
      >
        <Icon name="game-icons:globe" />
        <span class="btm-nav-label">Create</span>
      </button>
    </div>
  </form>
</template>
