<script setup>
  const props = defineProps({
    item: {type: Object, default: {}},
    kind: {type: String, default: ''},
  });
  const emit = defineEmits(['item-config-click']);
  function itemClick() {
    const data = {
      kind: props.kind,
      value: props.item,
    };
    console.log('item-config-click', data);
    emit('item-config-click', data);
  }
</script>
<template>
  <div class="btn btn-ghost btn-sm capitalize text-center" @click="itemClick">
    {{ item.name }}
  </div>
</template>
