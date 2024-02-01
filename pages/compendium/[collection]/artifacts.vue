<template>
  <div>
    <NuxtLayout name="browse" :open-drawer="toggleDetailDrawer">
      <template #main-content>
        <div class="mx-auto snap-start container">
          <div
            class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-3 xl:grid-cols-4"
          >
            <div
              v-for="artifactKey in Object.keys(artifacts)"
              class="shadow-xl p-3 card card-compact w-full bg-base-100 h-96 min-w-98 sm:mb-2"
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
          class="w-96 md:w-1/3 bg-secondary text-secondary-content min-h-full"
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
            <div v-if="selectedItem.depletion" class="badge badge-info m-1">
              {{ selectedItem.depletion }}
            </div>
          </div>
          <div class="divider"></div>
          <div
            class="p-6 rounded-md border-dashed border-2 border-base-content m-2"
          >
            {{ selectedItem.form }}
          </div>
          <div
            class="p-6 rounded-md border-dashed border-2 border-base-content m-2"
          >
            {{ selectedItem.effect }}
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
