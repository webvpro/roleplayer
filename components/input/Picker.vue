<script setup>
  const props = defineProps({
    items: {type: Array, default: []},
    pickedItems: {
      type: Array,
      default: [],
    },
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
  <div class="collapse">
    <input type="checkbox" class="peer" v-model="viewContent" />
    <div
      class="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
      @click="toggleCollapse"
    >
      Click me to show/hide content
    </div>
    <div
      class="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
    >
      <p>hello</p>
    </div>
  </div>
</template>
