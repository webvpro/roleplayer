<template>
  <h1>{{ characterData.name }}</h1>
</template>

<script setup>
  const props = defineProps({
    character: {type: Object, default: () => {}},
    editedBy: {type: String, default: 'owner'},
  });

  const emit = defineEmits(['close', 'save']);

  const characterData = reactive(props.character);
</script>
