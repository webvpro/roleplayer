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
                <ul v-if="archeType.archTypes" class="list-none">
                  <li class="card-title text-lg">Example Archetypes</li>
                  <li v-for="genreArcheTypes in archeType.archTypes">
                    <h3 class="font-semibold">{{ genreArcheTypes.label }}:</h3>
                    <span class="italic">{{
                      genreArcheTypes.items.join(', ')
                    }}</span>
                  </li>
                </ul>
                <div>
                  <h4>Starting Pools</h4>

                  <div
                    v-for="(poolKey, pIdx) in Object.keys(archeType.stat_pools)"
                    class="badge badge-primary m-1"
                    :key="pIdx"
                  >
                    {{ poolKey }}:
                    {{ archeType.stat_pools[pIdx] }}
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
          class="w-96 md:w-2/3 bg-secondary text-secondary-content min-h-full h-fit"
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
              class="tab tab-bordered text-xl"
              :class="isActiveTab('features')"
              @click="setActiveTab('features')"
              >Features</a
            >
            <a
              class="tab tab-bordered text-xl"
              :class="isActiveTab('intrusions')"
              @click="setActiveTab('intrusions')"
              >Intrusions</a
            >
            <a
              class="tab tab-bordered text-xl"
              :class="isActiveTab('backgrounds')"
              @click="setActiveTab('backgrounds')"
              >Backgrounds</a
            >
          </div>
          <div v-if="selectedTab === 'features'" class="p-3">
            <div
              class="p-6 rounded-md border-dashed bg-primary text-primary-content border-2 border-base-content m-2"
            >
              <label class="text-lg p-1 font-semibold w-full block"
                >Pools</label
              >
              {{ selectedItem.stat_pools }}
              <!--
              <div
                v-for="(poolKey, apIdx) in Object.keys(selectedItem.stat_pools)"
                class="badge badge-accent p-2 text-accent-content m-1 text-start md:text-lg"
                :key="apIdx"
              >
                {{ poolKey }}: {{ selectedItem.stat_pools[poolKey] }}
              </div> -->
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
          <!--
          <TierAbilitiesAccordion
            :tier_abilities="selectedItem.tier_abilities"
            @selected-item="openAbilityModal"
            collection="types"
          /> -->
        </div>
      </template>
    </NuxtLayout>
    <AbilityModal :ability="selectedAbility" @close-modal="closeAbilityModal" />
  </div>
</template>
<script setup>
  const {compendium, collection, fetchCompendium} = useCompendium();
  await fetchCompendium({collectionKey: 'types'});
  const toggleDetailDrawer = ref(false);
  const selectedAbility = ref(null);
  const selectedTab = ref('features');
  const archeTypes = computed(() => collection.value.data);
  const abilities = compendium.value.abilities.data;
  const selectedItem = ref(null);

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
    selectedAbility.value = abilities[id];
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
