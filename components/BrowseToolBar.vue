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
  const emit = defineEmits(['filter-change']);
  const {compendium, fetchCompendium} = useCompendium();
  await fetchCompendium();
  const collections = computed(() => mapSort(compendium.value));

  const router = useRouter();
  const route = useRoute();
  const selectedCompendium = ref('csrd');
  const selectedCollection = ref(
    route.name.split('-').slice(-1).join('').trim(),
  );

  const menuLocation = computed(() =>
    selectedCollection.value
      ? selectedCollection.value.toLowerCase()
      : selectedCompendium.value,
  );
  const quickFilters = reactive(props.filters);
  const changeCollection = () => {
    //console.log(selectedCollection.value);
    router.push(selectedCollection.value);
  };
  const changeFilter = filter => {
    emit('filter-change', {...quickFilters});
  };
</script>

<template>
  <div class="navbar sticky top-0 z-10 bg-neutral max-h-12">
    <div class="">
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
        <select
          v-if="Object.keys(quickFilters).length > 0"
          v-for="(filter, fIdx) in Object.keys(quickFilters)"
          class="select select-bordered join-item w-auto max-w-xs text-lg capitalize"
          v-model="quickFilters[filter].value"
          :key="`${filter}-select`"
          @change="changeFilter(filter)"
        >
          <option selected :value="null">
            Filter {{ quickFilters[filter].label }}
          </option>
          <option
            v-for="(option, oIdx) in quickFilters[filter].options"
            :key="`${filter}-${oIdx}`"
          >
            {{ option.toLowerCase() }}
          </option>
        </select>
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
          <select
            v-if="Object.keys(quickFilters).length > 0"
            v-for="(filter, fIdx) in Object.keys(quickFilters)"
            class="select select-bordered join-item w-full text-lg capitalize"
            v-model="quickFilters[filter].value"
            :key="`${filter}-select`"
            @change="changeFilter(filter)"
          >
            <option selected :value="null">
              Filter {{ quickFilters[filter].label }}
            </option>
            <option
              v-for="(option, oIdx) in quickFilters[filter].options"
              :key="`${filter}-${oIdx}`"
              class="capitalize"
            >
              {{ option.toLowerCase() }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
