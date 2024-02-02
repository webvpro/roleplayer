<template>
  <div>
    <NuxtLayout name="browse" :open-drawer="toggleDetailDrawer">
      <template #main-content>
        <div class="mx-auto snap-start container">
          <div
            class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-3 xl:grid-cols-4"
          >
            <div
              v-for="(flavorKey, tIdx) in Object.keys(flavors)"
              class="shadow-xl p-3 card card-compact w-full bg-base-100 h-96 min-w-98 sm:mb-2"
              :key="tIdx"
            >
              <div class="card-body">
                <h2 class="card-title capitalize">
                  {{ flavors[flavorKey].name }}
                </h2>
                <p>{{ flavors[flavorKey].description }}</p>
                <div class="card-actions justify-end">
                  <button
                    class="btn btn-primary"
                    @click="getSelectedItem(flavorKey)"
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
        <label for="item-details" class="drawer-overlay"></label>
        <div
          v-if="selectedItem"
          class="w-96 md:w-1/3 bg-secondary text-secondary-content min-h-full"
        >
          <div
            class="navbar border-b-base-300 border-b-2 text-secondary-content h-16"
          >
            <div class="navbar-start">
              <a class="btn btn-ghost text-xl capitalize">{{
                selectedItem.name
              }}</a>
            </div>
            <div class="navbar-center hidden lg:flex"></div>
            <div class="navbar-end">
              <button class="btn btn-ghost" @click="closeDrawer">
                <Icon class="text-lg" name="radix-icons:cross-2" />
              </button>
            </div>
          </div>
          <div
            v-if="selectedItem.description"
            class="p-6 rounded-md border-dashed border-2 border-base-content m-2"
          >
            {{ selectedItem.description }}
          </div>
          <p
            class="p-6 rounded-md bg-secondary text-secondary-content border-2 border-base-content m-2"
          >
            At a given tier, abilities from a flavor are traded one for one with
            standard abilities from a type.
          </p>
          <div v-if="selectedItem.abilities" class="p-10">
            <TierAbilitiesAccordion
              :tier_abilities="selectedItem.abilities"
              :tier_selection_text="[]"
              @selected-item="openAbilityModal"
            />
          </div>
        </div>
      </template>
    </NuxtLayout>
    <AbilityModal :ability="selectedAbility" @close-modal="closeAbilityModal" />
  </div>
</template>
<script setup>
  const {compendium, collections, collection, fetchCompendium, getCollection} =
    useCompendium();
  await fetchCompendium();
  const toggleDetailDrawer = ref(false);
  const selectedAbility = ref(null);
  const flavorsCollection = computed(() => getCollection('flavors'));
  const flavors = computed(() => flavorsCollection.value.data);
  const abilities = computed(() => getCollection('abilities').data);
  const selectedItem = ref(null);

  watch(selectedItem, value => {
    if (!value) {
      toggleDetailDrawer.value = null;
    } else {
      toggleDetailDrawer.value = true;
    }
  });

  const getSelectedItem = id => {
    console.log(id);
    selectedItem.value = flavors.value[id];
    toggleDetailDrawer.value = true;
  };
  const openAbilityModal = id => {
    selectedAbility.value = abilities.value[id];
  };
  const closeAbilityModal = item => {
    selectedAbility.value = null;
  };
  const closeDrawer = () => {
    selectedItem.value = null;
  };
  definePageMeta({
    layout: false,
  });
</script>
