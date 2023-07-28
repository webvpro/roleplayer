<template>
  <h1>{{ characterData.name }}</h1>
</template>

<script setup>
  const props = defineProps({
    character: {type: Object, default: () => {}},
    compendium: {type: Object, default: () => {}},
    editedBy: {type: String, default: 'owner'},
    sentence: {type: String, default: ''},
  });

  const emit = defineEmits(['update-character', 'close', 'open-modal']);

  const characterData = reactive(props.character);
</script>
