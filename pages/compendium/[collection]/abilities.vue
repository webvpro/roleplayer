<template>
  <div>
    <NuxtLayout
      name="browse"
      collectionKey="abilities"
      :filters="abilityFilters"
      :open-drawer="toggleDetailDrawer"
      @filter-change="onFilterChange"
      :drawer-label="selectedItem?.name"
      @drawer-close="closeDrawer"
    >
      <template #main-content>
        <div class="mx-auto scroll-mt-24 my-3 snap-start container">
          <div
            class="grid justify-center gap-3 auto-cols-fr auto-rows grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-3"
          >
            <div
              v-if="abilities"
              v-for="abilityKey in Object.keys(abilities)"
              class="shadow-xl p-3 card card-compact w-full bg-neutral text-neutral-content h-full scroll-mt-20 snap-start min-w-98 sm:mb-2"
            >
              <div class="card-body h-full">
                <h2 class="card-title">{{ abilities[abilityKey].name }}</h2>
                <div class="flex-warp w-full h-auto">
                  <div
                    v-if="abilities[abilityKey].pool"
                    v-for="pool in abilities[abilityKey].pool"
                    class="badge badge-success m-1 text-success-content capitalize text-nowrap"
                  >
                    {{ pool }}:
                    {{ abilities[abilityKey].cost }}
                  </div>
                  <div
                    v-if="abilities[abilityKey].kind"
                    class="badge badge-info m-1 text-info-content capitalize text-nowrap"
                  >
                    {{ abilities[abilityKey].kind }}
                  </div>
                  <div
                    v-if="abilities[abilityKey].tier"
                    class="badge badge-secondary m-1 text-secondary-content capitalize text-nowrap"
                  >
                    tier: {{ abilities[abilityKey].tier }}
                  </div>

                  <div
                    v-for="category in abilities[abilityKey].category"
                    class="badge badge-accent m-1 text-accent-content capitalize text-nowrap"
                  >
                    {{ category.split('_').join(' ').trim().toLowerCase() }}
                  </div>
                </div>
                <div class="divider"></div>
                <p class="line-clamp-5 max-h-full">
                  {{ abilities[abilityKey].description }}
                </p>

                <div class="card-actions justify-end mt-2">
                  <button
                    class="btn btn-primary"
                    @click.prevent="getSelectedItem(abilityKey)"
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
          <div v-if="selectedItem.kind" class="badge badge-info m-1 capitalize">
            {{ selectedItem.kind }}
          </div>
          <div v-if="selectedItem.tier" class="badge m-1 capitalize">
            tier: {{ selectedItem.tier }}
          </div>
          <div
            v-if="Array.isArray(selectedItem.category)"
            v-for="cat in selectedItem.category"
            class="badge badge-primary m-1 capitalize"
          >
            {{ cat.split('_').join(' ').trim() }}
          </div>
          <div class="divider"></div>
          <div
            class="p-6 rounded-md border-dashed bg-neutral border-2 border-neutral-content m-2"
          >
            <p
              v-if="selectedItem.description"
              v-for="desc in getParagraphAry(selectedItem.description)"
              class="p-1"
            >
              {{ desc }}
            </p>
          </div>
          <div
            v-if="
              selectedItem.options &&
              Array.isArray(selectedItem.options.items) &&
              selectedItem.options.items.length > 0
            "
            class="p-6 rounded-md border-dashed bg-neutral border-2 border-neutral-content m-2"
          >
            <label class="text-2xl p-1 font-semibold w-full block">{{
              selectedItem.options.limit.text
            }}</label>
            <ul>
              <li v-for="opts in selectedItem.options.items">
                <h4 class="m-1 font-semibold">{{ opts.label }}:</h4>
                <p class="indent-2 p-1">{{ opts.detail }}</p>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
  const route = useRoute();
  const itemRefs = ref([]);
  const itemGrd = ref();
  const {fetchCompendium, getCollection} = useCompendium();
  await fetchCompendium();
  getCollection('abilities').filters;
  const selectedItemKey = ref(null);
  const abilityFilters = ref(getCollection('abilities').filters);
  const abilities = ref(getCollection('abilities').data);
  const toggleDetailDrawer = ref(false);
  const selectedItem = ref(null);
  watch(toggleDetailDrawer, value => {
    if (!value) {
      selectedItem.value = null;
      selectedItemKey.value = null;
    }
  });
  watch(abilityFilters, value => {
    if (value) {
      //console.log('filter change', value);
      abilities.value = filterData(getCollection('abilities').data, value);
    }
  });
  //console.log('collection filters', getCollection('abilities').filters);
  const getSelectedItem = id => {
    console.log(id);
    selectedItemKey.value = id;
    selectedItem.value = abilities.value[id];
    toggleDetailDrawer.value = true;
  };

  const closeDrawer = () => {
    toggleDetailDrawer.value = false;
  };
  const onFilterChange = filters => {
    console.log('f-change', filters);
    abilityFilters.value = {...filters};
  };
  const getParagraphAry = pStr => {
    return pStr.split('\n') ?? [];
  };
  onMounted(async () => {
    if (route.hash && itemRefs.value) {
      getSelectedItem(route.hash.split('#')[1]);
    }
  });
  definePageMeta({
    layout: false,
  });
</script>
