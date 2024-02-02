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
              :key="`${fociKey}-${tIdx}`"
            >
              <div class="card-body">
                <h2 class="card-title capitalize">{{ foci[fociKey].name }}</h2>
                <p>{{ foci[fociKey].description }}</p>

                <div class="card-actions justify-end">
                  <button
                    class="btn btn-primary"
                    @click="getSelectedItem(fociKey)"
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
          v-if="selectedFocus"
          class="w-96 md:w-1/3 bg-secondary text-secondary-content min-h-full"
        >
          <div class="navbar">
            <div class="navbar-start">
              <a
                class="btn btn-ghost text-xl capitalize"
                @click.prevent="closeDrawer"
                >{{ selectedFocus.name }}</a
              >
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
            {{ selectedFocus.description }}
          </div>

          <div role="tablist" class="tabs tabs-bordered w-full pt-10 px-2">
            <a
              class="tab tab-bordered text-xl text-neutral"
              :class="isActiveTab('abilities')"
              @click.prevent="setActiveTab('abilities')"
              >Abilities</a
            >
            <a
              class="tab tab-bordered text-xl"
              :class="isActiveTab('intrusions')"
              @click.prevent="setActiveTab('intrusions')"
              >Intrusions</a
            >
          </div>
          <div v-if="selectedTab === 'abilities'" class="p-10">
            <TierAbilitiesAccordion
              :tier_abilities="selectedFocus.abilities"
              :tier_selection_text="tierSelectionText"
              @selected-item="openAbilityModal"
            />
          </div>

          <ul v-if="selectedTab === 'intrusions'" class="list-none w-full p-10">
            <li
              class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
            >
              {{ selectedFocus.intrusion.split('.') }}.
            </li>
          </ul>
        </div>
      </template>
    </NuxtLayout>
    <AbilityModal :ability="selectedAbility" @close-modal="closeAbilityModal" />
  </div>
</template>
<script setup>
  //loading data
  const {collection, fetchCompendium, getCollection} = useCompendium('CSRD');
  await fetchCompendium({collectionKey: 'foci'});
  //setup reactive and computed
  const fociOptions = reactive({});
  const toggleDetailDrawer = ref(false);
  const selectedAbility = ref(null);
  const selectedFocusID = ref(null);
  const foci = computed(() => getCollection('foci', fociOptions.value).data);
  const abilities = computed(() => getCollection('abilities'));
  const selectedFocus = computed(() => foci.value[selectedFocusID.value]);
  const tierSelectionText = [
    {tier: null, text: 'Choose one of the abilities listed below.'},
  ];
  const selectedTab = ref('abilities');
  watch(selectedFocusID, value => {
    if (!value) {
      toggleDetailDrawer.value = null;
    } else {
      toggleDetailDrawer.value = true;
    }
  });
  const isActiveTab = tab => {
    return tab === selectedTab.value
      ? 'tab-active text-base-content font-semibold'
      : '';
  };
  const setActiveTab = tab => {
    selectedTab.value = tab;
  };
  const getSelectedItem = id => {
    selectedFocusID.value = id;
  };

  const closeDrawer = () => {
    selectedFocusID.value = null;
  };
  const openAbilityModal = id => {
    selectedAbility.value = abilities.value.data[id];
  };
  const closeAbilityModal = () => {
    selectedAbility.value = null;
  };
  function formatIntrusionList(str) {
    const list = str.split('.');
    list.splice(list.length - 1, 1);
    return list;
  }
  definePageMeta({
    layout: false,
  });
</script>
