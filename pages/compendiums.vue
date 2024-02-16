<template>
  <div>
    <NuxtLayout name="create" :open-drawer="toggleCreateDrawer">
      <template #main-content>
        <button
          v-if="!toggleCreateDrawer"
          tabindex="0"
          class="fixed bottom-0 right-6 z-10 my-6 ml-auto btn btn-circle btn-primary text-lg"
          @click.prevent="onCreateClick"
        >
          <Icon name="streamline:add-1-solid" />
        </button>

        <div class="mx-auto scroll-mt-24 my-3 snap-start container">
          <div
            class="grid justify-center gap-3 auto-cols-fr auto-rows grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-3"
          >
            {{ myCompendiums }}
          </div>
        </div>
      </template>
      <template #drawer-side>
        <div class="drawer-overlay" @click="closeDrawer"></div>
        <div
          class="w-10/12 md:3/4 lg:w-1/2 xxl:1/4 bg-neutral text-neutral-content border-neutral-content min-h-full"
        >
          <div class="sticky z-50 navbar h-16">
            <div class="navbar-start">
              <a class="btn btn-ghost text-xl capitalize">
                Create a Compendium
              </a>
            </div>
            <div class="navbar-end">
              <button class="btn btn-ghost mr-3" @click="closeDrawer">
                <Icon class="text-lg" name="radix-icons:cross-2" />
              </button>
            </div>
          </div>
          <div class="h-full flex-col flex-grow p-3">Stuff</div>
          <div class="btm-nav">
            <button class="bg-warning text-warning-content">
              <Icon name="game-icons:globe" />
              <span class="btm-nav-label">Select All</span>
            </button>
            <button class="bg-success text-success-content">
              <Icon name="game-icons:globe" />
              <span class="btm-nav-label">Create</span>
            </button>
          </div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
  const route = useRoute();
  const toggleCreateDrawer = ref(false);
  const {compendiums} = useMyCompendium();
  const myCompendiums = computed(() => compendiums.value);
  const onCreateClick = () => {
    toggleCreateDrawer.value = true;
  };
  const closeDrawer = () => {
    toggleCreateDrawer.value = false;
  };
  useHead({
    title: `PlayCypher.com - Your Compendiums`,
    meta: [{name: 'viewport', content: 'viewport-fit=cover'}],
  });
  definePageMeta({
    layout: false,
    middleware: ['auth'],
  });
</script>
