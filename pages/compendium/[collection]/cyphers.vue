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
      <div class="mx-auto snap-start container">
        <div
          class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-3 xl:grid-cols-4"
        >
          <div
            v-for="cypherKey in Object.keys(cyphers)"
            class="shadow-xl p-6 card card-compact w-96 bg-base-100 min-h-56 max-h-64"
            :key="cypherKey"
          >
            <h2 class="card-title capitalize">{{ cyphers[cypherKey].name }}</h2>
            <div class="card-body">
              <p class="overflow-ellipsis overflow-hidden w-80 p-4 h-24">
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
    </div>
    <div class="drawer-side">
      <label for="item-details" class="drawer-overlay"></label>
      <div
        v-if="selectedItem"
        class="w-96 md:w-2/3 bg-secondary text-secondary-content"
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
        <div v-if="selectedItem.level.dice">
          <div class="badge badge-accent m-1">
            {{ `Level: ${selectedItem.level.dice}+${selectedItem.level.mod}` }}
          </div>
          <div
            v-if="selectedItem.categories.length"
            v-for="category in selectedItem.categories"
            class="badge badge-primary capitalize m-1"
          >
            {{ category.toLowerCase() }}
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
                <th>{{ rangeTxt(option.range) }}</th>
                <td>{{ option.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const {compendium} = useCompendium('csrd');
  const toggleDetailDrawer = ref(false);
  const cyphers = computed(() => compendium.value.collections.cyphers.items);
  const selectedItem = ref(null);
  watch(toggleDetailDrawer, value => {
    if (!value) {
      selectedItem.value = null;
    }
  });
  const getSelectedItem = id => {
    selectedItem.value = compendium.value.collections.cyphers.items[id];
    //console.log(compendium.value.collections.abilities.items[id]);
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
</script>
