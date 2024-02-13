<template>
  <div>
    <NuxtLayout name="browse" :open-drawer="toggleDetailDrawer">
      <template #main-content>
        <div class="mx-auto scroll-mt-24 my-3 snap-start container">
          <div
            class="grid justify-center gap-3 auto-cols-fr auto-rows grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-3"
          >
            <div
              v-for="(flavorKey, tIdx) in Object.keys(flavors)"
              class="shadow-xl p-3 card card-compact w-full scroll-mt-24 snap-start bg-neutral text-neutral-content h-full min-w-98 sm:mb-2"
              :id="flavorKey"
              :key="flavorKey"
            >
              <div class="card-body">
                <h2 class="card-title capitalize">
                  {{ flavors[flavorKey].name }}
                </h2>
                <p class="indent-1 md:line-clamp-2 my-2">
                  {{ flavors[flavorKey].description.split('\n')[0] }}
                </p>
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
          class="w-10/12 md:8/12 lg:w-6/12 xxl:1/4 bg-neutral text-neutral-content min-h-full"
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
  const route = useRoute();
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
  onMounted(() => {
    if (route.hash) {
      getSelectedItem(route.hash.split('#')[1]);
    }
  });
  definePageMeta({
    layout: false,
  });
</script>
