<template>
  <div>
    <NuxtLayout
      name="browse"
      :open-drawer="toggleDetailDrawer"
      :filters="cypherFilters"
      @filter-change="onFilterChange"
    >
      <template #main-content>
        <div class="mx-auto snap-start container">
          <div
            class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-3 xl:grid-cols-4"
          >
            <div
              v-for="cypherKey in Object.keys(cyphers)"
              class="shadow-xl p-3 card card-compact w-full bg-base-100 h-96 min-w-98 sm:mb-2"
              :key="cypherKey"
            >
              <h2 class="card-title capitalize">
                {{ cyphers[cypherKey].name }}
              </h2>
              <div class="card-body">
                <div class="flex-warp w-full h-auto">
                  <div
                    v-for="kind in cyphers[cypherKey].kinds"
                    class="badge badge-info capitalize m-1"
                  >
                    {{ kind.toLowerCase() }}
                  </div>
                </div>
                <p class="line-clamp-5 max-h-56">
                  {{ cyphers[cypherKey].effect }}
                </p>
                <div class="card-actions justify-end mt-2">
                  <button
                    class="btn btn-primary"
                    @click="getSelectedItem(cypherKey)"
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
          class="w-96 md:w-1/3 bg-secondary text-secondary-content min-h-full"
        >
          <div class="navbar h-16">
            <div class="navbar-start">
              <a class="btn btn-ghost text-xl capitalize">{{
                selectedItem.name
              }}</a>
            </div>
            <div class="navbar-end">
              <button class="btn btn-ghost" @click="closeDrawer">
                <Icon class="text-lg" name="radix-icons:cross-2" />
              </button>
            </div>
          </div>
          <div class="h-full flex-col flex-grow">
            <div v-if="selectedItem.level_dice" class="badge badge-accent m-1">
              {{
                `Level: ${selectedItem.level_dice}+${
                  selectedItem.level_mod ?? 0
                }`
              }}
            </div>
            <div
              v-for="kind in selectedItem.kinds"
              class="badge badge-info capitalize m-1"
            >
              {{ kind.toLowerCase() }}
            </div>
          </div>
          <div class="divider"></div>
          <div
            class="p-6 rounded-md border-dashed border-2 border-base-content m-2"
          >
            {{ selectedItem.effect }}
          </div>
          <div
            v-if="selectedItem.options.length"
            class="overflow-x-auto w-full mb-16 pb-3"
          >
            <table class="table table-zebra mx-auto">
              <thead>
                <tr>
                  <th>Result</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <!-- row 1 -->
                <tr v-for="option in selectedItem.options">
                  <td class="text-nowrap">
                    {{ `${option.start}-${option.end}` }}
                  </td>
                  <td>{{ option.entry }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
  const {fetchCompendium, getCollection} = useCompendium();
  await fetchCompendium();

  const toggleDetailDrawer = ref(false);
  const cypherCollection = computed(() => getCollection('cyphers'));
  const cyphers = computed(() =>
    filterData(cypherCollection.value.data, cypherFilters.value),
  );
  const selectedItem = ref(null);
  const cypherFilters = ref({
    kinds: {
      label: 'kind',
      options: cypherCollection.value.kinds,
      value: null,
    },
  });
  watch(toggleDetailDrawer, value => {
    if (!value) {
      selectedItem.value = null;
    }
  });
  const getSelectedItem = id => {
    selectedItem.value = cyphers.value[id];
    console.log('Selected Item', selectedItem.value);
    toggleDetailDrawer.value = true;
  };
  const closeDrawer = () => {
    toggleDetailDrawer.value = false;
  };
  const rangeTxt = rng => {
    if (rng.end > rng.start) {
      return `${rng.start}-${rng.end}`;
    }
    return rng.start;
  };
  const onFilterChange = filterData => {
    cypherFilters.value = filterData;
  };
  definePageMeta({
    layout: false,
  });
</script>
