<template>
  <div>
    <NuxtLayout name="browse" :open-drawer="toggleDetailDrawer">
      <template #main-content>
        <div class="mx-auto mt-3 snap-start container">
          <div
            class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-3 xl:grid-cols-4"
          >
            <div
              v-for="artifactKey in Object.keys(artifacts)"
              class="shadow-xl p-3 card card-compact w-full bg-neutral text-neutral-content h-full min-w-98 sm:mb-2"
              :key="artifactKey"
            >
              <h2 class="card-title capitalize">
                {{ artifacts[artifactKey].name }}
              </h2>
              <div class="card-body">
                <p class="line-clamp-5 max-h-56">
                  {{ artifacts[artifactKey].effect }}
                </p>
                <div class="card-actions justify-end mt-2">
                  <button
                    class="btn btn-primary"
                    @click="getSelectedItem(artifactKey)"
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
          <div class="navbar h-16">
            <div class="navbar-start">
              <a class="btn btn-ghost text-xl capitalize">{{
                selectedItem.name
              }}</a>
            </div>
            <div class="navbar-end">
              <button class="btn btn-ghost" @click="closeDrawer">
                <Icon class="text-lg" name="radix-icons:cross-2" />
              </button>
            </div>
          </div>
          <div class="h-full flex-col flex-grow">
            <div v-if="selectedItem.level_dice" class="badge badge-accent m-1">
              {{
                `Level: ${selectedItem.level_dice}+${
                  selectedItem.level_mod ?? 0
                }`
              }}
            </div>
          </div>
          <div class="divider"></div>
          <div
            class="p-6 rounded-md border-dashed bg-neutral border-2 border-neutral-content m-2"
          >
            {{ selectedItem.form }}
          </div>
          <div
            class="p-6 rounded-md border-dashed bg-neutral border-2 border-neutral-content m-2"
          >
            <label class="text-2xl p-1 font-semibold w-full capitalize"
              >effect</label
            >
            <p>{{ selectedItem.effect }}</p>
          </div>
          <div
            v-if="selectedItem.depletion"
            class="p-6 rounded-md border-dashed bg-neutral border-2 border-neutral-content m-2"
          >
            <label class="text-2xl p-1 font-semibold w-full capitalize"
              >depletion</label
            >
            <p>{{ selectedItem.depletion }}</p>
          </div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
  const {compendium, collections, collection, fetchCompendium} =
    useCompendium();
  await fetchCompendium({collectionKey: 'artifacts'});
  const toggleDetailDrawer = ref(false);
  const artifacts = computed(() => collection.value.data);
  const selectedItem = ref(null);
  watch(selectedItem, value => {
    if (!value) {
      toggleDetailDrawer.value = false;
    } else {
      toggleDetailDrawer.value = true;
    }
  });
  const getSelectedItem = id => {
    selectedItem.value = artifacts.value[id];
  };
  const closeDrawer = () => {
    selectedItem.value = null;
  };
  definePageMeta({
    layout: false,
  });
</script>
