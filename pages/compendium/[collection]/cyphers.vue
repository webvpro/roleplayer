<template>
  <div>
    <NuxtLayout
      name="browse"
      :open-drawer="toggleDetailDrawer"
      :filters="cyphersFilters"
      @filter-change="onFilterChange"
    >
      <template #main-content>
        <div class="mx-auto scroll-mt-24 my-3 snap-start container">
          <div v-if="!cyphers && Object.keys(cyphers).length <= 0">
            <div role="alert" class="alert alert-info">
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
              <span>No Cyphers Found, Time to make some more.</span>
            </div>
          </div>
          <div
            v-else
            class="grid justify-center gap-3 auto-cols-fr auto-rows grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-3"
          >
            <div
              v-for="cypherKey in Object.keys(cyphers)"
              class="shadow-xl p-3 card card-compact scroll-mt-24 snap-start w-full bg-neutral text-neutral-content h-full min-w-98 sm:mb-2"
              :id="cypherKey"
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
          class="w-10/12 md:3/4 lg:w-1/2 xxl:1/4 bg-neutral text-neutral-content border-neutral-content min-h-full"
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
            class="p-6 rounded-md border-dashed bg-neutral border-2 border-neutral-content m-2"
          >
            {{ selectedItem.effect }}
          </div>
          <div
            v-if="selectedItem.options.length"
            class="p-10 text-neutral-content"
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
  const route = useRoute();
  await fetchCompendium();

  const toggleDetailDrawer = ref(false);
  const cyphersFilters = ref(getCollection('cyphers').filters);
  const cyphers = ref(getCollection('cyphers').data);
  const selectedItem = ref(null);

  watch(toggleDetailDrawer, value => {
    if (!value) {
      selectedItem.value = null;
    }
  });
  watch(cyphersFilters, value => {
    if (value) {
      console.log('filter change', value);
      cyphers.value = filterData(getCollection('cyphers').data, value);
    }
  });
  const getSelectedItem = id => {
    selectedItem.value = cyphers.value[id];
    console.log('Selected Item', id);
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
  const onFilterChange = filters => {
    console.log('f-change', filters);
    cyphersFilters.value = {...filters};
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
