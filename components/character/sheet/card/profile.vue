<script setup>
  const props = defineProps({
    character: {
      type: Object,
      default: {},
    },
    mode: {
      type: String,
      default: 'view',
    },
  });
  const emit = defineEmits(['create', 'view']);
  const character = reactive(props.character);
  const title = computed(() => character.name ?? 'Create');
  const sentence = computed(
    () => character.sentence ?? 'Start a new character',
  );
  const hasId = computed(() => !!props.character.id);
  const showImage = computed(() => !!character?.url);
  const isMode = mode => {
    return props.mode && props.mode === mode;
  };
</script>
<template>
  <div
    class="card lg:card-side bg-base-100 border border-base-300 shadow-xl w-full h-full"
  >
    <figure class="flex-col items-center w-full h-full bg-primary text-8xl">
      <Icon v-if="!showImage" class="p-1" name="gala:portrait2" />

      <img v-if="showImage" class="h-full width-full" :src="character.url" />
    </figure>
    <div class="card-body w-full">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ sentence }}</p>
      <div></div>
      <div class="card-actions justify-end">
        <button
          v-if="isMode('create')"
          @click="emit('create')"
          class="btn btn-primary text-4xl"
        >
          <Icon class="" name="circum:medical-cross" />
        </button>
        <button
          v-if="!isMode('create')"
          @click="emit('view', character.id)"
          class="btn btn-primary btn-sm"
        >
          View
        </button>
      </div>
    </div>
  </div>
</template>
