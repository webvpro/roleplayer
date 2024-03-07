<template>
  <div>
    <NuxtLayout
      name="browse"
      :open-drawer="toggleDetailDrawer"
      :drawer-label="selectedFocus?.name"
      @drawer-close="closeDrawer"
    >
      <template #main-content>
        <div class="mx-auto scroll-mt-24 my-3 snap-start container">
          <div
            class="grid justify-center gap-3 auto-cols-fr auto-rows grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-3"
          >
            <div
              v-for="(fociKey, tIdx) in Object.keys(foci)"
              class="shadow-xl p-3 card card-compact w-full scroll-mt-24 snap-start bg-neutral text-neutral-content h-full min-w-98 sm:mb-2"
              :id="fociKey"
              :key="fociKey"
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
        <div v-if="selectedFocus" class="container p-4 pr-6">
          <div
            class="p-6 rounded-md border-dashed bg-neutral border-2 border-neutral-content w-full text-xl"
          >
            {{ selectedFocus.description }}
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
                aria-label="Abilities"
                checked
              />
              <div
                role="tabpanel"
                class="tab-content p-6 text-neutral-content col-span-2"
              >
                <TierAbilitiesAccordion
                  :tier_abilities="selectedFocus.abilities"
                  :tier_selection_text="tierSelectionText"
                  @selected-item="openAbilityModal"
                />
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
                class="tab-content p-1 text-neutral-content col-span-2"
              >
                <ul class="list-none w-full p-10">
                  <li
                    v-for="gmi in formatIntrusionList(selectedFocus.intrusion)"
                    class="p-6 rounded-md border-dashed bg-neutral border-2 border-neutral-content m-2"
                  >
                    {{ gmi }}
                  </li>
                </ul>
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
  //loading data
  const {fetchCompendium, getCollection} = useCompendium('CSRD');
  await fetchCompendium({collectionKey: 'foci'});
  //setup reactive and computed
  const fociOptions = reactive({});
  const toggleDetailDrawer = ref(false);
  const selectedAbility = ref(null);
  const selectedFocusID = ref(null);
  const foci = ref(getCollection('foci').data);
  const abilities = computed(() => getCollection('abilities').data);
  const selectedFocus = computed(() => foci.value[selectedFocusID.value]);
  const tierSelectionText = [
    {tier: null, text: 'Choose one of the abilities listed below.'},
  ];

  watch(selectedFocusID, value => {
    if (!value) {
      toggleDetailDrawer.value = false;
    } else {
      toggleDetailDrawer.value = true;
      console.log('toggle');
    }
  });

  const getSelectedItem = id => {
    console.log(id);
    selectedFocusID.value = id;
  };

  const closeDrawer = () => {
    selectedFocusID.value = null;
  };
  const openAbilityModal = id => {
    console.log(id);
    selectedAbility.value = abilities.value[id];
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
