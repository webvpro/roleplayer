<template>
  <div class="drawer drawer-end">
    <input
      id="item-details"
      type="checkbox"
      class="drawer-toggle"
      v-model="toggleDetailDrawer"
    />
    <div class="drawer-content">
      <BrowseToolBar />
      <div class="mt-3 mx-auto p-3 snap-start container">
        <div
          class="grid content-around grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 place-items-center"
        >
          <div
            v-for="ability in abilities"
            :key="ability.name"
            class="shadow-xl p-6 card card-compact w-96 bg-base-100 min-h-56 max-h-56"
          >
            <ListItem
              :item-data="ability"
              item-type="ability"
              @view-item="setSelected(ability.name)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label
        for="item-details"
        @click="clearSelected"
        class="drawer-overlay"
      ></label>
      <div class="p-4 w-96 bg-secondary text-secondary-content">
        <h1 class="text-xl font-bold p-3">{{ selectedItem.name }}</h1>
        <div v-if="selectedItem.pool[0]" class="badge badge-primary m-1">
          {{ selectedItem.pool[0] }}:{{ selectedItem.cost }}
        </div>
        <div v-if="selectedItem.tier" class="badge m-1">
          tier: {{ selectedItem.tier }}
        </div>
        <div
          v-for="category in selectedItem.categories"
          class="badge badge-accent m-1"
        >
          {{ category.toLowerCase() }}
        </div>
        <div class="divider"></div>
        <div class="p-6 rounded-md border-dashed border-2 border-base-content">
          {{ selectedItem.description }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const toggleDetailDrawer = ref(false);
  const abilityItemState = {
    id: '',
    name: null,
    description: '',
    pool: '',
    cost: 0,
    tier: '',
    categories: [],
  };
  let selectedItem = reactive(abilityItemState);
  const {getCollection, getCollectionItem} = useCompendium();
  const abilities = getCollection('abilities').sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  const setSelected = id => {
    const abilityObj = getCollectionItem('abilities', id);
    selectedItem.name = abilityObj.name;
    selectedItem.description = abilityObj.description;
    selectedItem.cost = abilityObj.cost ? abilityObj.cost : 0;
    selectedItem.pool = abilityObj.pool;
    selectedItem.tier = abilityObj.tier;
    selectedItem.categories = abilityObj.category;
    toggleDetailDrawer.value = true;
  };

  const clearSelected = () => {
    selectedItem = reactive(abilityItemState);
  };
</script>
