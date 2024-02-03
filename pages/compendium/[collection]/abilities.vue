<template>
  <div>
    <NuxtLayout
      name="browse"
      collectionKey="abilities"
      :filters="abilityFilters"
      :open-drawer="toggleDetailDrawer"
      @filter-change.once="onFilterChange"
    >
      <template #main-content>
        <div class="mx-auto snap-start container">
          <div
            class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-3 xl:grid-cols-4"
          >
            <div
              v-if="abilities"
              v-for="abilityKey in Object.keys(abilities)"
              class="shadow-xl p-3 card card-compact w-full bg-base-100 min-h-96 min-w-98 sm:mb-2"
              :key="abilityKey"
            >
              <div class="card-body h-full">
                <h2 class="card-title">{{ abilities[abilityKey].name }}</h2>
                <div class="flex-warp w-full h-auto">
                  <!-- pool badge -->
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
        <div class="drawer-overlay" @click="closeDrawer"></div>
        <div
          v-if="selectedItem"
          class="w-10/12 md:8/12 lg:w-6/12 xxl:1/4 bg-neutral text-neutral-content min-h-full"
        >
          <div class="navbar h-auto">
            <div class="navbar-start">
              <a class="btn btn-ghost normal-case text-xl">{{
                selectedItem.name
              }}</a>
            </div>
            <div class="navbar-end">
              <button class="btn btn-ghost" @click="closeDrawer">
                <Icon class="text-lg" name="radix-icons:cross-2" />
              </button>
            </div>
          </div>
          <div
            v-if="selectedItem.pool[0]"
            class="badge badge-success m-1 capitalize"
          >
            {{ selectedItem.pool[0] }}: {{ selectedItem.cost }}
          </div>
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
            {{ selectedItem.description }}
          </div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
  import filterData from '../../../utils/filterData';

  const {fetchCompendium, getCollection} = useCompendium();
  await fetchCompendium({collectionKey: 'abilities'});
  const abilityCollection = computed(() => getCollection('abilities'));
  const abilities = computed(() =>
    filterData(abilityCollection.value.data, abilityFilters.value),
  );
  const abilityFilters = ref({
    category: {
      label: 'category',
      options: abilityCollection.value.categories,
      value: null,
    },
    tier: {
      label: 'tier',
      options: abilityCollection.value.tier_categories,
      value: null,
    },
    kind: {
      label: 'kind',
      options: abilityCollection.value.kinds,
      value: null,
    },
  });
  const toggleDetailDrawer = ref(false);
  const selectedItem = ref(null);
  watch(toggleDetailDrawer, value => {
    if (!value) {
      selectedItem.value = null;
    }
  });

  const getSelectedItem = id => {
    console.log(id);
    selectedItem.value = abilities.value[id];
    toggleDetailDrawer.value = true;
  };
  const closeDrawer = () => {
    toggleDetailDrawer.value = false;
  };
  const onFilterChange = filterData => {
    abilityFilters.value = filterData;
  };
  definePageMeta({
    layout: false,
  });
</script>
