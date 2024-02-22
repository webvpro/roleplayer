<template>
  <div class="flex flex-col h-screen">
    <NavPageHeaderMain />
    <main id="main-body" class="relative flex flex-col flex-1 overflow-hidden">
      <div class="drawer drawer-end h-full mb-3 w-auto">
        <input
          id="item-details"
          type="checkbox"
          class="drawer-toggle"
          v-model="openDrawer"
        />
        <div class="drawer-content snap-y overflow-y-scroll">
          <BrowseToolBar :filters="filters" @filter-change="onFilterChange" />
          <slot name="main-content"></slot>
        </div>
        <div class="drawer-side z-50">
          <slot name="drawer-side"></slot>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
  const props = defineProps([
    'openDrawer',
    'collections',
    'collectionKey',
    'filters',
    'onEvent',
  ]);
  const emit = defineEmits(['filter-change']);
  const openDrawer = toRef(props, 'openDrawer');
  const onFilterChange = event => {
    console.log(event);
    emit('filter-change', event);
  };
</script>
