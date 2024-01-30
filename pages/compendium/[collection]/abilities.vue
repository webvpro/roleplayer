<template>
  <div>
    <NuxtLayout
      name="browse"
      :open-drawer="toggleDetailDrawer"
      collectionKey="abilities"
    >
      <template #main-content collections="collections">
        <div class="mx-auto snap-start container">
          <div
            class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-3 xl:grid-cols-4"
          >
            <div
              v-for="abilityKey in Object.keys(abilities)"
              class="shadow-xl p-3 card card-compact w-full bg-base-100 min-h-96 min-w-98 sm:mb-2"
              :key="ability"
            >
              <div class="card-body h-full">
                <h2 class="card-title">{{ abilities[abilityKey].name }}</h2>
                <div
                  v-if="abilities[abilityKey].pool"
                  class="badge badge-primary m-1 capitalize"
                >
                  {{ abilities[abilityKey].pool }}:
                  {{ abilities[abilityKey].cost }}
                </div>
                <div
                  v-if="abilities[abilityKey].tier"
                  class="badge m-1 capitalize"
                >
                  tier: {{ abilities[abilityKey].tier }}
                </div>
                <div
                  v-if="abilities[abilityKey].tier"
                  class="badge m-1 capitalize"
                >
                  kind: {{ abilities[abilityKey].kind }}
                </div>
                <div
                  v-if="abilities[abilityKey].categories"
                  v-for="category in abilities[abilityKey].categories"
                  class="badge badge-accent m-1 capitalize"
                >
                  {{ category.split('_').join(' ').trim() }}
                </div>
                <div class="divider"></div>
                <p class="line-clamp-5 max-h-full">
                  {{ abilities[abilityKey].description }}
                  {{ abilities[abilityKey].kind }}
                </p>

                <div class="card-actions justify-end mt-2">
                  <button
                    class="btn btn-primary"
                    @click="getSelectedItem(abilityKey)"
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
            v-if="category"
            v-for="category in selectedItem.categories"
            class="badge badge-accent m-1 capitalize"
          >
            {{ category.split('_').join(' ').trim() }}
          </div>
          <div class="divider"></div>
          <div
            class="p-6 rounded-md border-dashed border-2 border-base-content m-2"
          >
            {{ selectedItem.description }}
          </div>
        </div>
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
  const {compendium, collections, collection, fetchCompendium} =
    useCompendium();
  await fetchCompendium({collectionKey: 'abilities'});
  const toggleDetailDrawer = ref(false);
  const abilities = computed(() => collection.value.data);

  const selectedItem = ref(null);
  watch(toggleDetailDrawer, value => {
    if (!value) {
      selectedItem.value = null;
    }
  });
  const getSelectedItem = id => {
    selectedItem.value = abilities.value[id];
    //console.log(compendium.value.collections.abilities.items[id]);
    toggleDetailDrawer.value = true;
  };
  const closeDrawer = () => {
    toggleDetailDrawer.value = false;
  };
  definePageMeta({
    layout: false,
  });
</script>
