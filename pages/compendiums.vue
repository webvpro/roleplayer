<template>
  <div>
    <NuxtLayout name="create">
      <template #main-content>
        <div class="fixed bottom-0 right-6 z-30">
          <label
            tabindex="0"
            class="my-6 ml-auto btn btn-circle btn-primary text-lg"
          >
            <Icon name="streamline:add-1-solid" />
          </label>
        </div>
        <div class="mx-auto scroll-mt-24 my-3 snap-start container">
          <div
            class="grid justify-center gap-3 auto-cols-fr auto-rows grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-3"
          >
            List
          </div>
        </div>
      </template>
      <template #drawer-side>
        <div class="drawer-overlay" @click="closeDrawer"></div>
        <div>drawer</div>
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
  const route = useRoute();
  const itemRefs = ref([]);
  definePageMeta({
    layout: false,
    middleware: ['auth'],
  });
</script>
