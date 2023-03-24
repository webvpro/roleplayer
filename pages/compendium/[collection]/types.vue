<template>
  <div class="drawer drawer-end">
    <div class="mt-3 mx-auto p-3 snap-start container">
      <div
        class="grid content-around grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 place-items-center"
      >
        <div
          v-for="(collection, idx) in Object.entries(collections)"
          :key="idx"
          class="shadow-xl p-6 card card-compact w-96 bg-base-100 min-h-56 max-h-56"
        >
          {{ collection }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const {collections} = useCompendium();
</script>
