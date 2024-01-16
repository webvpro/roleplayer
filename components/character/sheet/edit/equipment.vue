<template>
  <h1>{{ sheet.equipment }}</h1>
  <h1>{{ compendium.types.items.warrior }}</h1>
</template>

<script setup>
  const props = defineProps({
    editedBy: {type: String, default: 'owner'},
    sentence: {type: String, default: ''},
  });

  const emit = defineEmits(['update-character', 'close', 'open-modal']);

  const character = inject('characterData');
  const sheet = computed(() => character.value);
  const collections = inject('collectionsData');
  const compendium = computed(() => collections.value);
</script>
