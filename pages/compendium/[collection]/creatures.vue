<template>
  <div>
    <NuxtLayout
      name="browse"
      :open-drawer="toggleDetailDrawer"
      :filters="creatureFilters"
      @filter-change="onFilterChange"
      :drawer-label="selectedItem?.name"
      @drawer-close="closeDrawer"
    >
      <template #main-content>
        <div class="mx-auto scroll-mt-24 my-3 snap-start container">
          <div v-if="!creatures || Object.keys(creatures).length <= 0" class="">
            <div role="alert" class="alert alert-info w-fit mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>No Creatures or NPCs Found, Time to make some more.</span>
            </div>
          </div>
          <div
            class="grid justify-center gap-3 auto-cols-fr auto-rows grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-3"
          >
            <div
              v-for="creatureKey in Object.keys(creatures)"
              class="shadow-xl p-3 card card-compact scroll-mt-24 snap-start w-full bg-neutral text-neutral-content h-full min-w-98 sm:mb-2"
              :id="creatureKey"
              :key="creatureKey"
            >
              <div class="card-title flex flex-col p-3">
                <h2
                  class="capitalize snap-start w-full text-left md:text-sm font-semibold"
                >
                  {{ creatures[creatureKey].name.toLowerCase() }}
                </h2>
                <div class="mx-auto w-full h-fit min-h-14">
                  <div
                    v-if="creatures[creatureKey].level"
                    class="badge badge-accent text-accent-content m-1 text-nowrap"
                  >
                    {{ `Level: ${creatures[creatureKey].level}` }}
                  </div>
                  <div
                    v-if="creatures[creatureKey].kind"
                    class="badge badge-accent text-accent-content m-1 capitalize text-nowrap"
                  >
                    {{ creatures[creatureKey].kind }}
                  </div>
                  <div
                    v-if="creatures[creatureKey].health"
                    class="badge badge-success text-success-content m-1 text-nowrap"
                  >
                    {{ `Health:${creatures[creatureKey].health}` }}
                  </div>
                  <div
                    v-if="creatures[creatureKey].damage"
                    class="badge badge-error text-error-content m-1 text-nowrap"
                  >
                    {{ `Damage:${creatures[creatureKey].damage}` }}
                  </div>
                  <div
                    class="badge badge-warning text-error-content m-1 capitalize text-nowrap"
                  >
                    Armor: {{ creatures[creatureKey].armor ?? 0 }}
                  </div>
                </div>
              </div>

              <div class="card-body">
                <div
                  v-if="creatures[creatureKey].description"
                  class="w-fit p-2 mb-1 min-h-32"
                >
                  <p class="indent-1 md:line-clamp-2 my-2">
                    {{ creatures[creatureKey].description.split('\n')[0] }}
                  </p>
                </div>
                <div class="card-actions justify-end mt-2">
                  <button
                    class="btn btn-primary"
                    @click="getSelectedItem(creatureKey)"
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
        <div class="container p-4 pr-6">
          <div class="mx-auto snap-start container h-fit text-lg">
            <div v-if="selectedItem.level" class="badge m-1">
              {{ `Level: ${selectedItem.level}` }}
            </div>
            <div
              v-if="selectedItem.kind"
              class="badge badge-neutral border-neutral-content text-neutral-content m-1 capitalize"
            >
              {{ selectedItem.kind }}
            </div>
            <div
              v-if="selectedItem.health"
              class="badge badge-success text-success-content m-1"
            >
              {{ `Health:${selectedItem.health}` }}
            </div>
            <div
              v-if="selectedItem.damage"
              class="badge badge-error text-error-content m-1"
            >
              {{ `Damage:${selectedItem.damage}` }}
            </div>
            <div
              v-if="selectedItem.armor"
              class="badge badge-warning text-warning-content m-1 capitalize"
            >
              Armor: {{ selectedItem.armor }}
            </div>
          </div>
          <div class="divider"></div>
          <div
            v-if="selectedItem.description"
            class="p-6 border-dashed border-2 border-neutral-content m-2"
          >
            <p
              class="indent-2 mb-3"
              v-for="pTxt in getParagraphAry(selectedItem.description)"
            >
              {{ pTxt }}
            </p>
          </div>
          <div class="w-full p-3 pt-6">
            <div
              role="tablist"
              class="tabs tabs-bordered bg-neutral text-neutral-content border-neutral-content min-w-full"
            >
              <input
                type="radio"
                name="creature-tab-1"
                role="tab"
                class="tab text-lg"
                aria-label="Details"
                checked
              />
              <div
                role="tabpanel"
                class="tab-content p-6 text-neutral-content col-span-3"
              >
                <div
                  class="p-6 rounded-md border-dashed bg-neutral text-neutral-content border-2 border-neutral-content m-2"
                >
                  <h1 class="text-xl font-semibold">Motive</h1>
                  <p class="indent-3">{{ selectedItem.motive }}</p>
                </div>
                <div
                  class="p-6 border-dashed border-2 border-neutral-content m-2"
                >
                  <label class="text-2xl p-1 font-semibold w-full block"
                    >Stats</label
                  >
                  <div
                    class="badge badge-accent p-3 text-accent-content m-1 text-start md:text-lg"
                  >
                    Health:
                    {{
                      selectedItem.health > 0 ? selectedItem.health : ` GM Set`
                    }}
                  </div>
                  <div
                    class="badge badge-accent p-3 text-accent-content m-1 text-start md:text-xl"
                  >
                    Damage:
                    {{
                      parseInt(selectedItem.damage) > 0
                        ? selectedItem.damage
                        : ` GM Set `
                    }}
                  </div>
                  <div
                    class="badge badge-accent p-3 text-accent-content m-1 text-start md:text-lg"
                  >
                    Armor: {{ selectedItem.armor ?? 0 }}
                  </div>
                  <div
                    class="badge badge-accent p-3 text-accent-content m-1 text-start md:text-lg"
                  >
                    Movement: {{ selectedItem.movement ?? ` GM Set ` }}
                  </div>
                </div>
                <div
                  v-if="selectedItem.use"
                  class="p-6 border-dashed border-2 border-neutral-content m-2"
                >
                  <label class="text-2xl p-1 font-semibold w-full block"
                    >Use</label
                  >
                  <p class="indent-3">{{ selectedItem.use }}</p>
                </div>
              </div>
              <input
                v-if="selectedItem.combat || selectedItem.modifications"
                type="radio"
                name="creature-tab-1"
                role="tab"
                class="tab text-lg"
                aria-label="Actions"
              />
              <div
                role="tabpanel"
                class="tab-content p-6 text-neutral-content col-span-3"
              >
                <div
                  v-if="
                    Array.isArray(selectedItem.combat) &&
                    selectedItem.combat.length > 0
                  "
                  class="p-6 m-2"
                >
                  <label class="text-2xl p-1 font-semibold w-full block"
                    >Combat</label
                  >
                  <p
                    v-if="selectedItem.combat"
                    v-for="combat in selectedItem.combat"
                    class="p-2 rounded-md border-dashed border-2 border-base-content m-2"
                  >
                    {{ combat }}
                  </p>
                </div>
                <div
                  v-if="
                    selectedItem.modifications &&
                    Array.isArray(selectedItem.modifications) &&
                    selectedItem.modifications.length > 0
                  "
                  class="p-6 m-2"
                >
                  <label class="text-2xl p-1 font-semibold w-full block">
                    Modifications
                  </label>
                  <p
                    v-for="mod in selectedItem.modifications"
                    class="p-2 rounded-md border-dashed border-2 border-base-content m-2"
                  >
                    {{ mod }}
                  </p>
                </div>
              </div>
              <input
                v-if="selectedItem.intrusions"
                type="radio"
                name="creature-tab-1"
                role="tab"
                class="tab text-lg"
                aria-label="Intrusions"
              />
              <div
                role="tabpanel"
                class="tab-content p-6 text-neutral-content col-span-3"
              >
                <p
                  v-if="selectedItem.intrusions"
                  v-for="intrusion in selectedItem.intrusions"
                  class="p-3 rounded-md border-dashed border-2 border-base-content m-3"
                >
                  {{ intrusion }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
  const {fetchCompendium, getCollection} = useCompendium();
  const route = useRoute();
  await fetchCompendium();
  const toggleDetailDrawer = ref(false);

  const selectedTab = ref('details');
  //const drawerTabs = reactive(initTabs);
  const creatureFilters = ref(getCollection('creatures').filters);
  const creatures = ref(getCollection('creatures').data);

  const selectedItem = ref(null);

  watch(selectedItem, value => {
    if (!value) {
      toggleDetailDrawer.value = false;
    } else {
      toggleDetailDrawer.value = true;
    }
    setActiveTab('details');
  });
  watch(creatureFilters, value => {
    if (value) {
      //console.log('filter change', value.kind);
      creatures.value = filterData(getCollection('creatures').data, value);
    }
  });
  const getSelectedItem = id => {
    selectedItem.value = creatures.value[id];
  };
  const closeDrawer = () => {
    selectedItem.value = null;
  };
  const getParagraphAry = pStr => {
    return pStr.split('\n') ?? [];
  };
  const isActiveTab = tab => {
    return tab === selectedTab.value
      ? 'border-neutral-content tab-active font-bold'
      : 'border-neutral-content';
  };
  const setActiveTab = tab => {
    selectedTab.value = tab;
  };
  const onFilterChange = filterData => {
    console.log('change', filterData);
    creatureFilters.value = {...filterData};
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
