<template>
  <div>
  <NuxtLayout name="browse" :open-drawer="toggleDetailDrawer">
    <template #main-content>
      <div class="mx-auto snap-start container">
        <div
          class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-3 xl:grid-cols-4"
        >
          <div
            v-for="(fociKey, tIdx) in Object.keys(foci)"
            class="shadow-xl p-3 card card-compact w-full bg-base-100 h-96 min-w-98 sm:mb-2"
            :key="tIdx"
          >
            <div class="card-body">
              <h2 class="card-title capitalize">{{ foci[fociKey].name }}</h2>
              <p>{{ foci[fociKey].description }}</p>
              <p class="p-2 rounded-md border-dashed border-2 border-base-content m-2"><h3 class="font-semibold">GM Intrusion</h3>{{ foci[fociKey].intrusion }}</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary" @click="getSelectedItem(fociKey)">
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
      <div v-if="selectedItem" class="w-96 md:w-2/3 bg-secondary text-secondary-content min-h-full h-fit">
        <div class="navbar">
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
       <div class="divider"></div>
        <div
          class="p-6 rounded-md border-dashed border-2 border-base-content m-2"
        >
          {{ selectedItem.description }}
        </div>

        <TierAbilitiesAccordion :tier_abilities="selectedItem.tier_abilities" @selected-item="openAbilityModal" />
      </div>
    </template>
    
  </NuxtLayout>
  <AbilityModal :ability="selectedAbility" @close-modal="closeAbilityModal" />
  </div>
</template>
<script setup>
  const {compendium, collections, fetchCompendium} = useCompendium();
  await fetchCompendium();
  const toggleDetailDrawer = ref(false);
  const selectedAbility = ref(null);
  const foci = compendium.value.collections.foci.items;
  const abilities = compendium.value.collections.abilities;
  const selectedItem = ref(null);

  watch(toggleDetailDrawer, value => {
    if (!value) {
      selectedItem.value = null;
    }
  });
const getSelectedItem = id => {
    console.log(id)
    selectedItem.value = foci[id];
    toggleDetailDrawer.value = true;
  };
  const closeDrawer = () => {
    toggleDetailDrawer.value = false;
  };
const openAbilityModal = id => {
    console.log(id)
    selectedAbility.value = abilities.items[id];
  };
  const closeAbilityModal = () => {
    selectedAbility.value = null;
  };
  definePageMeta({
    layout: false,
  });
</script>
