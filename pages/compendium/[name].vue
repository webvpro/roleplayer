<template>
  <div class="h-full mb-3 w-auto overflow-auto">
    <div class="mx-auto snap-start container">
      <div
        class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <div
          v-if="collections"
          v-for="(key, idx) in Object.keys(collections).filter(collection => {
            return !hideCollections.includes(collection);
          })"
          :key="key"
          class="shadow-xl p-3 card card-compact w-full bg-base-100 h-full min-w-full sm:mb-2"
        >
          <div>
            <div class="text-center">
              <label
                for="item-details"
                class="card-title capitalize w-full text-center"
              >
                {{ collections[key].label }}
              </label>
            </div>
            <div class="card-body">
              <p class="overflow-ellipsis overflow-hidden w-80 p-2 h-48">
                {{ collections[key].description }}
              </p>
              <div class="justify-center card-actions">
                <button class="btn btn-secondary" @click="viewCollection(key)">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script async setup>
  const {compendium, fetchCompendium} = useCompendium();
  const hideCollections = ['advancements', 'pools', 'shifts'];
  await fetchCompendium();
  const collections = computed(() => mapSort(compendium.value));
  const router = useRouter();
  console.log(
    'compendium loaded',
    Object.keys(compendium.value).filter(collection => {
      return !hideCollections.includes(collection);
    }),
  );
  const route = useRoute();
  const viewCollection = collectionName => {
    router.push(`${route.path}/${collectionName}`);
  };
</script>
