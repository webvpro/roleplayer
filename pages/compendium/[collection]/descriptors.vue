<template>
  <div>
    <NuxtLayout name="browse" :open-drawer="toggleDetailDrawer">
      <template #main-content>
        <div class="mx-auto snap-start container">
          <div
            class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <div
              v-for="(descriptorKey, dIdx) in Object.keys(descriptors)"
              class="shadow-xl p-3 card card-compact w-full bg-base-100 h-full min-w-full sm:mb-2"
              :key="tIdx"
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
          class="w-96 md:w-2/3 bg-secondary text-secondary-content h-min-full h-fit"
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
            class="p-6 rounded-md border-dashed border-2 border-base-content m-2"
          >
            {{ selectedItem.description }}
          </p>
          <div class="tabs w-full pl-2">
            <a
              class="tab tab-bordered text-xl"
              :class="isActiveTab('characteristics')"
              @click="setActiveTab('characteristics')"
              >Characteristics</a
            >
            <a
              class="tab tab-bordered text-xl"
              :class="isActiveTab('links')"
              @click="setActiveTab('links')"
              >Starter Links</a
            >
          </div>
          <div v-if="selectedTab === 'characteristics'" class="p-3">
            <div
              v-for="characteristic in selectedItem.characteristics"
              class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
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
              class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
            >
              <p>{{ link }}</p>
            </div>
          </div>

          <div class="divider"></div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
  const {compendium, collections, fetchCompendium} = useCompendium();
  await fetchCompendium();
  const toggleDetailDrawer = ref(false);
  const selectedTab = ref('characteristics');
  const descriptors = compendium.value.collections.descriptors.items;
  const selectedItem = ref(null);

  watch(toggleDetailDrawer, value => {
    if (!value) {
      selectedItem.value = null;
    }
  });
  const getSelectedItem = id => {
    selectedItem.value = descriptors[id];
    toggleDetailDrawer.value = true;
  };
  const closeDrawer = () => {
    toggleDetailDrawer.value = false;
  };
  const isActiveTab = tab => {
    return tab === selectedTab.value ? 'tab-active text-neutral-600' : '';
  };
  const setActiveTab = tab => {
    selectedTab.value = tab;
  };
  definePageMeta({
    layout: false,
  });
</script>
