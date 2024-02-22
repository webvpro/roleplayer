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
        <div class="drawer-content overflow-y-scroll">
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
  const props = defineProps(['openDrawer', 'onEvent']);
  const openDrawer = toRef(props, 'openDrawer');
</script>
