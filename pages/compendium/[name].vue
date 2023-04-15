<template>
  <div class="h-full mb-3 w-auto overflow-auto">
    <div class="mx-auto snap-start container">
      <div
        class="grid justify-center gap-4 auto-cols-fr auto-rows-auto md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <div
          v-for="(key, idx) in Object.keys(collections)"
          :key="key"
          class="shadow-xl p-3 card card-compact w-full bg-base-100 h-full min-w-full sm:mb-2"
        >
          <div>
            <div class="text-center">
              <label for="item-details" class="card-title">
                {{ collections[key].name }}
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
<script setup>
  const {compendium, fetchCompendium} = useCompendium(); // will need to pass in a file id defaults to env
  await fetchCompendium();
  const collections = ref(compendium.value.collections);
  const router = useRouter();

  const route = useRoute();
  const viewCollection = collectionName => {
    router.push(`${route.path}/${collectionName}`);
  };
</script>
