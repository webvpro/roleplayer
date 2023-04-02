<template>
  <div class="drawer drawer-end h-full mb-3 w-auto">
    <input
      id="item-details"
      type="checkbox"
      class="drawer-toggle"
      v-model="toggleDetailDrawer"
    />
    <div class="drawer-content">
      <BrowseToolBar />
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
    </div>
    <div class="drawer-side">
      <label for="item-details" class="drawer-overlay"></label>
      <div
        v-if="selectedItem"
        class="w-96 md:w-2/3 bg-secondary text-secondary-content"
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
        <TierAbilitiesAccordion
          :tier_abilities="selectedItem.tier_abilities"
          @selected-item="openAbilityModal"
          collection="flavors"
        />
      </div>
    </div>
    <AbilityModal :ability="selectedAbility" @close-modal="closeAbilityModal" />
  </div>
</template>
<script setup>
  const {compendium} = useCompendium('csrd');
  const toggleDetailDrawer = ref(false);
  const selectedAbility = ref(null);
  const flavors = compendium.value.collections.flavors.items;
  const abilities = compendium.value.collections.abilities;
  const selectedItem = ref(null);

  watch(toggleDetailDrawer, value => {
    if (!value) {
      selectedItem.value = null;
    }
  });

  const getSelectedItem = id => {
    console.log(id);
    selectedItem.value = flavors[id];
    toggleDetailDrawer.value = true;
  };
  const openAbilityModal = id => {
    selectedAbility.value = abilities.items[id];
  };
  const closeAbilityModal = item => {
    selectedAbility.value = null;
  };
</script>
