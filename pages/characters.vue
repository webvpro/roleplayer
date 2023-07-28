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
<script setup>
  definePageMeta({
    layout: 'sheet',
  });
  const viewContent = ref(false);
  function toggleCollapse() {
    viewContent.value = !viewContent.value;
  }
</script>
