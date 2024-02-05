<template>
  <div>
    <NuxtLayout name="create" :open-drawer="toggleDetailDrawer">
      <template #main-content>
        <div class="fixed bottom-0 right-6 z-30">
          <div class="dropdown dropdown-top dropdown-end">
            <label
              tabindex="0"
              class="my-6 ml-auto btn btn-circle btn-primary text-lg"
            >
              <Icon name="mdi:account-cog" />
            </label>
            <div
              tabindex="0"
              class="dropdown-content shadow w-56 rounded-box"
            ></div>
          </div>
        </div>
      </template>
      <template #drawer-side>
        <div class="drawer-overlay" @click="closeDrawer"></div>
        <div class="w-1/3 bg-secondary text-secondary-content min-h-full h-fit">
          <div class="navbar h-auto">
            <div class="navbar-start">
              <a class="btn btn-ghost normal-case text-xl">{{
                editDrawerContent?.label
              }}</a>
            </div>
            <div class="navbar-end">
              <button class="btn btn-ghost" @click="closeDrawer">
                <Icon class="text-lg" name="radix-icons:cross-2" />
              </button>
            </div>
          </div>
          <div class="m-3"></div>

          <div
            class="sticky justify-items-center w-full bottom-0 right-0 p-3 bg-secondary text-secondary-content z-30"
          >
            <button class="btn" @click="onClose">Close</button>
            <button name="submit" type="Submit" class="btn btn-active">
              Save
            </button>
          </div>
        </div>
      </template>
      <template #sheet-modal>
        <div>modal</div>
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
  //test
  const route = useRoute();
  definePageMeta({
    layout: false,
  });
</script>
