<template>
  <div>
    <NuxtLayout name="browse" :open-drawer="toggleDetailDrawer">
      <template #main-content>
        <div class="mx-auto scroll-mt-24 my-3 snap-start container">
          <div
            class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <div
              v-for="(descriptorKey, dIdx) in Object.keys(descriptors)"
              class="shadow-xl p-3 card card-compact scroll-mt-24 snap-start w-full bg-neutral text-neutral-content h-full min-w-98 sm:mb-2"
              :id="descriptorKey"
              :key="descriptorKey"
            >
              <div class="card-body">
                <h2 class="card-title capitalize">
                  {{ descriptors[descriptorKey].name }}
                </h2>
                <p class="line-clamp-5 w-64 p-2 mb-1 h-64">
                  {{ descriptors[descriptorKey].description }}
                </p>
                <div class="card-actions justify-end">
                  <button
                    class="btn btn-primary"
                    @click="getSelectedItem(descriptorKey)"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #drawer-side>
        <div class="drawer-overlay" @click="closeDrawer"></div>
        <div
          v-if="selectedItem"
          class="w-10/12 md:8/12 lg:w-6/12 xxl:1/4 bg-neutral text-neutral-content min-h-full"
        >
          <div class="navbar">
            <div class="navbar-start">
              <a class="btn btn-ghost normal-case text-3xl"
                ><span class="capitalize">{{ selectedItem.name }}</span></a
              >
            </div>
            <div class="navbar-center hidden lg:flex"></div>
            <div class="navbar-end">
              <button class="btn btn-ghost" @click="closeDrawer">
                <Icon class="text-3xl" name="radix-icons:cross-2" />
              </button>
            </div>
          </div>
          <div class="divider"></div>
          <p
            class="p-6 rounded-md border-dashed bg-neutral text-neutral-content border-2 border-neutral-content m-2"
          >
            {{ selectedItem.description }}
          </p>
          <div
            role="tablist"
            class="tabs tabs-boxed bg-neutral text-neutral-content border-neutral-content"
          >
            <a
              class="tab text-neutral-content"
              :class="isActiveTab('characteristics')"
              @click="setActiveTab('characteristics')"
              >Characteristics</a
            >
            <a
              class="tab text-neutral-content"
              :class="isActiveTab('links')"
              @click="setActiveTab('links')"
              >Starter Links</a
            >
          </div>
          <div v-if="selectedTab === 'characteristics'" class="p-3">
            <div
              v-for="characteristic in selectedItem.characteristics"
              class="p-6 rounded-md border-dashed bg-neutral text-neutral-content border-2 border-neutral-content m-2"
            >
              <label class="text-lg mb-1 font-semibold capitalize">{{
                characteristic.name
              }}</label>

              <p class="">
                {{ characteristic.description }}
              </p>
            </div>
          </div>
          <div v-if="selectedTab === 'links'" class="p-3">
            <div
              v-for="link in selectedItem.links"
              class="p-6 rounded-md border-dashed bg-neutral text-neutral-content border-2 border-neutral-content m-2"
            >
              <p>{{ link }}</p>
            </div>
          </div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
  const {compendium, collections, collection, fetchCompendium, getCollection} =
    useCompendium();
  const route = useRoute();
  await fetchCompendium({collectionKey: 'descriptors'});
  const toggleDetailDrawer = ref(false);
  const selectedTab = ref('characteristics');
  const descriptors = computed(() => getCollection('descriptors').data);
  const selectedItem = ref(null);

  watch(toggleDetailDrawer, value => {
    if (!value) {
      selectedItem.value = null;
    }
  });
  const getSelectedItem = id => {
    selectedItem.value = descriptors.value[id];
    toggleDetailDrawer.value = true;
  };
  const closeDrawer = () => {
    toggleDetailDrawer.value = false;
  };
  const isActiveTab = tab => {
    return tab === selectedTab.value ? 'tab-active font-bold' : '';
  };
  const setActiveTab = tab => {
    selectedTab.value = tab;
  };
  onMounted(() => {
    if (route.hash) {
      getSelectedItem(route.hash.split('#')[1]);
    }
  });
  definePageMeta({
    layout: false,
  });
</script>
