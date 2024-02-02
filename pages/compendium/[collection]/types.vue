<template>
  <div>
    <NuxtLayout name="browse" :open-drawer="toggleDetailDrawer">
      <template #main-content :collections="compendium">
        <div class="mx-auto snap-start container">
          <div
            class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-3 xl:grid-cols-4"
          >
            <div
              v-for="(archeType, tIdx) in archeTypes"
              class="shadow-xl p-3 card card-compact w-full bg-base-100 h-full min-w-full sm:mb-2"
              :key="tIdx"
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
                    class="btn btn-primary"
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
        <div class="drawer-overlay" @click="closeDrawer"></div>
        <div
          v-if="selectedItem"
          class="w-96 xl:w-1/3 bg-secondary text-secondary-content min-h-full"
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
          <div role="tablist" class="tabs tabs-bordered w-full pt-10 px-2">
            <a
              class="tab tab-bordered text-xl text-neutral"
              :class="isActiveTab('features')"
              @click="setActiveTab('features')"
              >Features</a
            >
            <a
              class="tab tab-bordered text-xl text-neutral"
              :class="isActiveTab('intrusions')"
              @click="setActiveTab('intrusions')"
              >Intrusions</a
            >
            <a
              class="tab tab-bordered text-xl text-neutral"
              :class="isActiveTab('background')"
              @click="setActiveTab('background')"
              >Background</a
            >
          </div>
          <div v-if="selectedTab === 'features'" class="p-3">
            <div
              v-for="feature in selectedItem.features"
              class="p-6 rounded-md border-dashed bg-base-200 text-base-content border-2 border-base-content m-2"
            >
              <label class="text-lg mb-1 font-semibold">{{
                feature.name
              }}</label>
              <p>{{ feature.description }}</p>
            </div>
            <label class="text-lg m-3 font-semibold">Abilities</label>
            <div class="px-3">
              <TierAbilitiesAccordion
                :tier_abilities="selectedItem.abilities"
                :tier_selection_text="tierSelectionText"
                @selected-item="openAbilityModal"
              />
            </div>
          </div>
          <div v-if="selectedTab === 'intrusions'" class="p-3">
            <div
              v-for="intrusion in selectedItem.intrusions"
              class="p-6 rounded-md border-dashed bg-base-200 text-base-content border-2 border-base-content m-2"
            >
              <label class="text-lg mb-1 font-semibold">{{
                intrusion.name
              }}</label>
              <p>{{ intrusion.description }}</p>
            </div>
          </div>
          <div v-if="selectedTab === 'background'" class="p-10">
            <table className="table table-zebra">
              <tbody>
                <tr
                  v-for="bg in selectedItem.background.table"
                  className="bg-base-200"
                >
                  <th>{{ bg.end }}</th>
                  <td>{{ bg.entry }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </NuxtLayout>
    <AbilityModal :ability="selectedAbility" @close-modal="closeAbilityModal" />
  </div>
</template>
<script setup>
  const {collections, fetchCompendium, getCollection} = useCompendium();
  await fetchCompendium();
  const typesCollection = computed(() => getCollection('types'));
  const toggleDetailDrawer = ref(false);
  const selectedItem = ref(null);
  const selectedAbility = ref(null);
  const selectedTab = ref('features');
  const archeTypes = computed(() => typesCollection.value.data);
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
    selectedItem.value = archeTypes.value[idx];
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
    return tab === selectedTab.value ? 'tab-active text-neutral-600' : '';
  };
  const setActiveTab = tab => {
    selectedTab.value = tab;
  };
  definePageMeta({
    layout: false,
  });
</script>
