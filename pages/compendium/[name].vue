<template>
  <div class="">
    <div class="mt-3 mx-auto p-3 snap-start container">
      <div
        class="grid content-around grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 place-items-center"
      >
        <div
          v-for="(key, idx) in Object.keys(collections)"
          :key="key"
          class="shadow-xl p-6 card card-compact w-96 bg-base-100 min-h-56"
        >
          <div>
            <div class="text-center">
              <label for="item-details" class="drawer-button card-title">
                {{ collections[key].name }}
              </label>
            </div>
            <div class="card-body">
              <p
                class="text-base overflow-ellipsis overflow-hidden w-80 p-4 h-80"
              >
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
  const {collections} = useCompendium('csrd');
  const router = useRouter();
  const route = useRoute();
  const viewCollection = collectionName => {
    router.push(`${route.path}/${collectionName}`);
  };
</script>
