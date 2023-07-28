<script setup>
  const props = defineProps({
    items: {type: Array, default: []},
    selectedItem,
    key: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'Thing',
    },
  });
  const viewContent = ref(false);

  function toggleCollapse() {
    console.log(viewContent.value);
    viewContent.value = !viewContent.value;
  }
</script>
<template>
  <div class="form-control w-full">
    <label class="input-group input-group-md input-group-vertical">
      <span class="bg-primary text-primary-content">{{ label }}</span>
    </label>
    <ErrorMessage name="name" />
  </div>
</template>
