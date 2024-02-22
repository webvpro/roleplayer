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
        <div class="drawer-content overflow-y-auto">
          <slot name="main-content"></slot>
        </div>
        <div class="drawer-side z-50">
          <slot name="drawer-side"></slot>
        </div>
      </div>
    </main>
    <!-- modal open with @click = "window.sheet_modal.shoeModal" -->
    <dialog
      id="sheet_modal"
      class="modal modal-bottom sm:modal-middle absolute"
    >
      <form method="dialog" class="modal-box p-0 bg-neutral">
        <slot name="sheet-modal"></slot>
      </form>
    </dialog>
  </div>
</template>
<script setup>
  const props = defineProps(['openDrawer', 'collections', 'openModal']);
  const openDrawer = toRef(props, 'openDrawer');
</script>
