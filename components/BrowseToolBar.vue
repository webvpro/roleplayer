<script setup>
  const props = defineProps({
    filters: {
      type: Object,
      default: {},
    },
    setFilter: {
      type: Function,
      default: () => {},
    },
  });
  const {compendium, fetchCompendium} = useCompendium();
  await fetchCompendium();
  const collections = computed(() => mapSort(compendium.value));

  const router = useRouter();
  const route = useRoute();
  const selectedCompendium = ref('csrd');
  const selectedCollection = ref(
    route.name.split('-').slice(-1).join('').trim(),
  );

  const changeCollection = () => {
    //console.log(selectedCollection.value);
    router.push(selectedCollection.value);
  };
  const menuLocation = computed(() =>
    selectedCollection.value
      ? selectedCollection.value.toLowerCase()
      : selectedCompendium.value,
  );
  const quickFilters = reactive(props.filters);
</script>

<template>
  <div class="navbar sticky top-0 z-10 bg-neutral max-h-12">
    <div class="navbar-start">
      <div class="join join-vertical hidden lg:block join-horizontal">
        <select
          class="select select-bordered join-item w-auto max-w-xs text-lg"
          v-model="selectedCompendium"
        >
          <option disabled selected>Select Compendium</option>
          <option value="csrd">CSRD Compendium</option>
          <option value="eberron">Eberron Compendium</option>
          <option value="space_jazz">Space Jazz Compendium</option>
        </select>
        <select
          v-if="collections"
          class="select select-bordered join-item w-auto max-w-xs text-lg capitalize"
          v-model="selectedCollection"
          @change="changeCollection"
        >
          <option disabled selected>Select Collection</option>
          <option
            v-for="(key, idx) in Object.keys(collections).filter(
              collectionKey => {
                return !['advancements', 'pools', 'shifts'].includes(
                  collectionKey,
                );
              },
            )"
            :value="key"
            :key="idx"
            class="capitalize"
          >
            {{ collections[key].label }}
          </option>
        </select>

        <div
          v-if="Object.keys(quickFilters).length > 0"
          class="dropdown join-item dropdown-right"
        >
          <div tabindex="0" role="button" class="btn btn-primary m-1">
            Filters
          </div>
          <ul
            tabindex="0"
            class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div>

      <div class="dropdown block lg:hidden">
        <summary
          tabindex="3"
          class="btn btn-secondary bordered m-1 capitalize text-secondary-content"
        >
          {{ `${selectedCompendium.split('_').join(' ')} ${menuLocation}` }}
          <Icon class="text-xl" name="ic:baseline-keyboard-double-arrow-down" />
        </summary>
        <div
          class="p-2 shadow menu dropdown-content z-[1] bg-secondary rounded-box w-fit"
        >
          <select
            class="select select-bordered join-item w-auto max-w-xs text-lg"
            v-model="selectedCompendium"
          >
            <option disabled selected>Select Compendium</option>
            <option value="csrd">CSRD Compendium</option>
            <option value="eberron">Eberron Compendium</option>
            <option value="space_jazz">Space Jazz Compendium</option>
          </select>
          <select
            v-if="collections"
            class="select select-bordered join-item w-auto max-w-xs text-lg capitalize"
            v-model="selectedCollection"
            @change="changeCollection"
          >
            <option disabled selected>Select Collection</option>
            <option
              v-for="(key, idx) in Object.keys(collections).filter(
                collectionKey => {
                  return !['advancements', 'pools', 'shifts'].includes(
                    collectionKey,
                  );
                },
              )"
              :value="key"
              :key="idx"
              class="capitalize"
            >
              {{ collections[key].label }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="navbar-center"></div>
    <div class="navbar-end"></div>
  </div>
</template>

<style scoped></style>
