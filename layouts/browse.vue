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
        <div v-if="drawerLabel" class="drawer-side z-50">
          <div class="drawer-overlay" @click="handleClose"></div>
          <div
            class="w-10/12 md:8/12 lg:w-6/12 xxl:1/4 bg-neutral text-neutral-content min-h-full"
          >
            <div class="navbar p-6">
              <div class="navbar-start">
                <a
                  class="btn btn-ghost text-xl capitalize text-nowrap truncate text-ellipsis line-clamp-1"
                  >{{ drawerLabel }}</a
                >
              </div>
              <div class="navbar-end">
                <button class="btn btn-ghost" @click="handleClose">
                  <Icon class="text-lg" name="radix-icons:cross-2" />
                </button>
              </div>
            </div>
            <div class="divider"></div>
            <slot name="drawer-side"></slot>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
  const props = defineProps([
    'openDrawer',
    'drawerLabel',
    'collections',
    'collectionKey',
    'filters',
    'onEvent',
  ]);
  const emit = defineEmits(['filter-change', 'drawer-close']);
  const openDrawer = toRef(props, 'openDrawer');
  function handleClose() {
    emit('drawer-close');
  }
  const onFilterChange = event => {
    console.log(event);
    emit('filter-change', event);
  };
</script>
