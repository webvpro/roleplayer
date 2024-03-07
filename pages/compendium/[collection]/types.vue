<template>
  <div>
    <NuxtLayout
      name="browse"
      :open-drawer="toggleDetailDrawer"
      :drawer-label="selectedItem?.name"
      @drawer-close="closeDrawer"
    >
      <template #main-content :collections="compendium">
        <div class="mx-auto scroll-mt-24 m-3 snap-start container">
          <div
            class="grid justify-center gap-3 auto-cols-fr auto-rows grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-3"
          >
            <div
              v-for="(archeType, tIdx) in archeTypes.data"
              class="shadow-xl p-3 card card-compact w-full scroll-mt-24 snap-start bg-neutral text-neutral-content h-full min-w-fit"
              :id="archeType"
              :key="archeType"
            >
              <div class="card-body">
                <h2 class="card-title w-full text-center">
                  {{ archeType.name }}
                </h2>
                <p>{{ archeType.description }}</p>
                <div>
                  <h4>Starting Pools</h4>

                  <div
                    v-for="(poolKey, pIdx) in Object.keys(archeType.stat_pools)"
                    class="badge badge-primary m-1"
                    :key="pIdx"
                  >
                    {{ poolKey }}:
                    {{ archeType.stat_pools[poolKey] }}
                  </div>
                </div>
                <div class="card-actions justify-end">
                  <button
                    class="btn btn-neutral"
                    @click="getSelectedItem(tIdx)"
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
          <div
            class="p-6 rounded-md border-dashed bg-neutral border-2 border-neutral-content m-2"
          >
            {{ selectedItem.description }}
          </div>
          <div
            v-if="selectedItem.stat_pools"
            class="flex flex-col p-3 w-full items-center"
          >
            <h3 class="w-full m-2">Starting Pools</h3>
            <div class="stats shadow mx-auto w-auto">
              <div
                v-for="statKey in Object.keys(selectedItem.stat_pools)"
                class="stat place-items-center"
              >
                <div class="stat-title">{{ statKey }}</div>
                <div class="stat-value">
                  {{ selectedItem.stat_pools[statKey] }}
                </div>
              </div>
            </div>
          </div>
          <div class="w-full p-3 pt-6">
            <div
              role="tablist"
              class="tabs tabs-bordered bg-neutral text-neutral-content border-neutral-content min-w-full"
            >
              <input
                type="radio"
                name="foci-tab-1"
                role="tab"
                class="tab text-lg"
                aria-label="Features"
                checked
              />
              <div
                role="tabpanel"
                class="tab-content p-6 text-neutral-content col-span-3"
              >
                <div
                  v-for="feature in selectedItem.features"
                  class="p-6 rounded-md border-dashed bg-neutral border-2 border-neutral-content m-2"
                >
                  <label class="text-lg mb-1 font-semibold">{{
                    feature.name
                  }}</label>
                  <p>{{ feature.description }}</p>
                </div>
                <label class="text-lg m-3 font-semibold">Abilities</label>
                <div class="px-3 mx-auto">
                  <TierAbilitiesAccordion
                    :tier_abilities="selectedItem.abilities"
                    :tier_selection_text="tierSelectionText"
                    @selected-item="openAbilityModal"
                  />
                </div>
              </div>
              <input
                type="radio"
                name="foci-tab-1"
                role="tab"
                class="tab text-lg"
                aria-label="Intrusions"
              />
              <div
                role="tabpanel"
                class="tab-content p-1 text-neutral-content col-span-3"
              >
                <div
                  v-for="intrusion in selectedItem.intrusions"
                  class="p-6 rounded-md border-dashed bg-neutral border-2 border-neutral-content m-2"
                >
                  <label class="text-lg mb-1 font-semibold">{{
                    intrusion.name
                  }}</label>
                  <p>{{ intrusion.description }}</p>
                </div>
              </div>
              <input
                type="radio"
                name="foci-tab-1"
                role="tab"
                class="tab text-lg"
                aria-label="Background"
              />
              <div
                role="tabpanel"
                class="tab-content p-1 text-neutral-content col-span-3"
              >
                <table className="table table-zebra-zebra">
                  <tbody>
                    <tr v-for="bg in selectedItem.background.table" class="">
                      <th>{{ bg.end }}</th>
                      <td>{{ bg.entry }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </template>
    </NuxtLayout>
    <AbilityModal :ability="selectedAbility" @close-modal="closeAbilityModal" />
  </div>
</template>
<script setup>
  const {collections, fetchCompendium, getCollection} = useCompendium();
  const route = useRoute();
  await fetchCompendium();
  const toggleDetailDrawer = ref(false);
  const selectedItem = ref(null);
  const selectedAbility = ref(null);
  const selectedTab = ref('features');
  const archeTypes = getCollection('types');
  const abilities = computed(() => getCollection('abilities').data);
  const tierSelectionText = computed(() => {
    const tierTxtArray = [];
    if (selectedItem && selectedItem.value.abilities_per_tier) {
      selectedItem.value.abilities_per_tier.forEach(tierData =>
        tierTxtArray.push({
          tier: tierData.tier,
          text: `Choose ${tierData.limit} of the abilities listed below.`,
        }),
      );
    } else {
      tierTxtArray.push({
        tier: null,
        text: 'Choose one of the abilities listed below.',
      });
    }
    return tierTxtArray;
  });
  /*const tierSelectionText = [
    {tier: null, text: 'Choose one of the abilities listed below.'},
  ];*/

  watch(toggleDetailDrawer, value => {
    if (!value) {
      selectedItem.value = null;
    }
  });

  const getSelectedItem = idx => {
    selectedItem.value = archeTypes.data[idx];
    toggleDetailDrawer.value = true;
  };
  const closeDrawer = () => {
    toggleDetailDrawer.value = false;
  };
  const openAbilityModal = id => {
    selectedAbility.value = abilities.value[id];
  };
  const closeAbilityModal = () => {
    selectedAbility.value = null;
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
