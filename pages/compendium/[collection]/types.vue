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
          class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <div
            v-for="(typeKey, tIdx) in Object.keys(pcTypes)"
            class="shadow-xl p-3 card card-compact w-full bg-base-100 h-full min-w-full sm:mb-2"
            :key="tIdx"
          >
            <div class="card-body">
              <h2 class="card-title">{{ pcTypes[typeKey].name }}</h2>
              <p>{{ pcTypes[typeKey].description }}</p>
              <div>
                <h4>Starting Pools</h4>
                <div
                  v-for="(poolKey, pIdx) in Object.keys(
                    pcTypes[typeKey].starting_pools,
                  )"
                  class="badge badge-primary m-1"
                  :key="pIdx"
                >
                  {{ poolKey }}: {{ pcTypes[typeKey].starting_pools[poolKey] }}
                </div>
              </div>
              <div class="card-actions justify-end">
                <button
                  class="btn btn-primary"
                  @click="getSelectedItem(typeKey)"
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
      <label for="item-details" @click="" class="drawer-overlay"></label>
      <div
        v-if="selectedItem"
        class="w-96 md:w-2/3 bg-secondary text-secondary-content"
      >
        <div class="navbar">
          <div class="navbar-start">
            <a class="btn btn-ghost normal-case text-3xl">{{
              selectedItem.name
            }}</a>
          </div>
          <div class="navbar-center hidden lg:flex"></div>
          <div class="navbar-end">
            <button class="btn btn-ghost" @click="closeDrawer">
              <Icon class="text-3xl" name="radix-icons:cross-2" />
            </button>
          </div>
        </div>
        <div class="divider"></div>
        <div
          class="p-6 rounded-md border-dashed border-2 border-base-content m-2"
        >
          {{ selectedItem.description }}
        </div>

        <div class="tabs w-full pl-2">
          <a
            class="tab tab-lifted bg-neutral-600 text-neutral-content"
            :class="isActiveTab('features')"
            @click="setActiveTab('features')"
            >Features</a
          >
          <a
            class="tab tab-lifted bg-neutral-600 text-neutral-content"
            :class="isActiveTab('intrusions')"
            @click="setActiveTab('intrusions')"
            >Intrusions</a
          >
          <a
            class="tab tab-lifted bg-neutral-600 text-neutral-content"
            :class="isActiveTab('backgrounds')"
            @click="setActiveTab('backgrounds')"
            >Backgrounds</a
          >
        </div>
        <div v-if="selectedTab === 'features'" class="p-3">
          <div
            class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
          >
            <label class="text-lg p-1 font-semibold w-full block">Pools</label>
            <div
              v-for="(poolKey, apIdx) in Object.keys(
                selectedItem.starting_pools,
              )"
              class="badge badge-accent p-2 text-accent-content m-1 text-start md:text-lg"
              :key="apIdx"
            >
              {{ poolKey }}: {{ selectedItem.starting_pools[poolKey] }}
            </div>
          </div>
          <div
            v-for="feature in selectedItem.starting_features"
            class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
          >
            <p>{{ feature.description }}</p>
          </div>
        </div>
        <div v-if="selectedTab === 'intrusions'" class="p-3">
          <div
            v-for="intrusion in selectedItem.intrusions"
            class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
          >
            <label class="text-lg mb-1 font-semibold">{{
              intrusion.name
            }}</label>
            <p>{{ intrusion.description }}</p>
          </div>
        </div>
        <div v-if="selectedTab === 'backgrounds'">
          <div
            v-for="background in selectedItem.backgrounds"
            class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
          >
            {{ background }}
          </div>
        </div>
        <div class="divider"></div>
        <TierAbilitiesAccordion
          :tier_abilities="selectedItem.tier_abilities"
          @selected-item="openAbilityModal"
          collection="types"
        />
      </div>
    </div>
    <input
      type="checkbox"
      id="ability-modal"
      class="modal-toggle"
      v-model="toggleAbilityModal"
    />
    <label for="ability-modal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box p-0">
        <div
          v-if="selectedAbility"
          class="mockup-window border bg-base-300 p-6"
        >
          <h3 class="font-bold text-lg">{{ selectedAbility.name }}</h3>
          <p class="p-3">{{ selectedAbility.description }}</p>
          <div class="modal-action">
            <button class="btn m-3" @click.stop="closeAbilityModal()">
              Close
            </button>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>
<script setup>
  const {compendium} = useCompendium('csrd');
  const toggleDetailDrawer = ref(false);
  const toggleAbilityModal = ref(false);
  const selectedAbility = ref(null);
  const selectedTab = ref('features');
  const pcTypes = compendium.value.collections.types.items;
  const abilities = compendium.value.collections.abilities;
  const selectedItem = ref(null);

  watch(toggleDetailDrawer, value => {
    if (!value) {
      selectedItem.value = null;
    }
  });
  watch(toggleAbilityModal, value => {
    if (!value) {
      selectedAbility.value = null;
    }
  });
  const getSelectedItem = id => {
    selectedItem.value = pcTypes[id];
    toggleDetailDrawer.value = true;
  };
  const closeDrawer = () => {
    toggleDetailDrawer.value = false;
  };
  const openAbilityModal = id => {
    selectedAbility.value = abilities.items[id];
    toggleAbilityModal.value = true;
  };
  const closeAbilityModal = () => {
    toggleAbilityModal.value = false;
  };
  const isActiveTab = tab => {
    return tab === selectedTab.value ? 'tab-active text-neutral-600' : '';
  };
  const setActiveTab = tab => {
    selectedTab.value = tab;
  };
  const tierText = (tier = 0, limitName = 'zero') => {
    return tier == 1
      ? `Choose four of the abilities listed below. You can't choose the same ability more than once unless its description says otherwise. The full description for each listed ability can be found in Abilities, which also has descriptions for flavor and focus abilities in a single vast catalog.`
      : `Choose ${limitName} of the abilities listed below (or from a lower tier) to add to your repertoire. In addition, you can replace one of your lower-tier abilities with a different one`;
  };
</script>
