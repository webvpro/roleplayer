<template>
  <div class="w-full">
    <ContentQuery :path="tablePath" find="one" v-slot="{data}">
      <h1 class="">{{ data.title }}</h1>
      <p>{{ data.description }}</p>
      <ContentRenderer
        :value="data"
        class="w-full prose max-w-none prose-table:table table-zebra prose-td:text-nowrap cell-adjust"
      />
    </ContentQuery>
  </div>
</template>
<script setup>
  const props = defineProps({
    table: {type: String, required: true},
  });
  const tablePath = computed(() => `/tables/${props.table}`);
</script>
