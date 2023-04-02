<template>
  <div class="drawer drawer-end h-full mb-3 w-auto">
    <input
      id="item-details"
      type="checkbox"
      class="drawer-toggle"
      v-model="toggleDetailDrawer"
    />
    <div class="drawer-content">
      <BrowseToolBar />
      <div class="mx-auto snap-start container">
        <div
          class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-3 xl:grid-cols-4"
        >
          <div
            v-for="ability in abilities"
            class="shadow-xl p-3 card card-compact w-full bg-base-100 h-96 min-w-98 sm:mb-2"
            :key="ability[0]"
          >
            <div class="card-body">
              <h2 class="card-title">{{ ability[1].name }}</h2>
              <p class="line-clamp-5 max-h-24">
                {{ ability[1].description }}
              </p>
              <div class="card-actions justify-end mt-2">
                <button
                  class="btn btn-primary"
                  @click="getSelectedItem(ability[0])"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="item-details" class="drawer-overlay"></label>
      <div
        v-if="selectedItem"
        class="w-96 md:w-2/3 bg-secondary text-secondary-content"
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
          v-if="selectedItem.pool"
          class="badge badge-primary m-1 capitalize"
        >
          {{ selectedItem.pool }}: {{ selectedItem.cost }}
        </div>
        <div v-if="selectedItem.tier" class="badge m-1 capitalize">
          tier: {{ selectedItem.tier }}
        </div>
        <div
          v-for="category in selectedItem.categories"
          class="badge badge-accent m-1 capitalize"
        >
          {{ category.split('_').join(' ').trim().toLowerCase() }}
        </div>
        <div class="divider"></div>
        <div
          class="p-6 rounded-md border-dashed border-2 border-base-content m-2"
        >
          {{ selectedItem.description }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const {compendium} = useCompendium('csrd');
  const toggleDetailDrawer = ref(false);
  const abilities = computed(() =>
    Object.entries(compendium.value.collections.abilities.items).sort(
      (a, b) => {
        let fa = a[1].name.toLowerCase(),
          fb = b[1].name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      },
    ),
  );

  const selectedItem = ref(null);
  watch(toggleDetailDrawer, value => {
    if (!value) {
      selectedItem.value = null;
    }
  });
  const getSelectedItem = id => {
    selectedItem.value = compendium.value.collections.abilities.items[id];
    //console.log(compendium.value.collections.abilities.items[id]);
    toggleDetailDrawer.value = true;
  };
  const closeDrawer = () => {
    toggleDetailDrawer.value = false;
  };
</script>
