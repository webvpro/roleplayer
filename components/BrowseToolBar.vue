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
  const optsArray = Array.from(Array(10).keys()).map((itm, idx) => idx + 1);

  const menuLocation = computed(() =>
    selectedCollection.value
      ? selectedCollection.value.toLowerCase()
      : selectedCompendium.value,
  );
  const browseFilters = ref(props.filters);
  const changeCollection = () => {
    router.push(selectedCollection.value);
  };
  const changeFilter = filter => {
    //console.log('browsefilter', browseFilters.value);
    emit('filter-change', browseFilters.value);
  };
  function getOptions(opts) {
    return opts.length > 0 ? [...opts] : [...optsArray];
  }
</script>

<template>
  <div class="navbar sticky top-0 z-10 bg-base-300 text-base-content max-h-12">
    <div class="">
      <div class="join join-vertical hidden lg:block join-horizontal">
        <select
          class="select select-bordered border-base-content bg-base-300 text-base-content join-item w-auto max-w-xs text-lg"
          v-model="selectedCompendium"
        >
          <option disabled selected>Select Compendium</option>
          <option value="csrd">CSRD Compendium</option>
          <option value="eberron">Eberron Compendium</option>
          <option value="space_jazz">Space Jazz Compendium</option>
        </select>
        <select
          v-if="collections"
          class="select select-bordered border-base-content bg-base-300 text-base-content join-item w-auto max-w-xs text-lg capitalize"
          v-model="selectedCollection"
          @change.prevent="changeCollection"
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
          v-if="Object.keys(browseFilters)"
          v-for="(filter, fIdx) in Object.keys(browseFilters)"
          class="select select-bordered border-base-content bg-base-300 text-base-content join-item w-auto max-w-xs text-lg capitalize"
          v-model="browseFilters[filter].value"
          :key="`${filter}-select`"
          @change.prevent="changeFilter(filter)"
        >
          <option selected :value="null">
            Filter {{ browseFilters[filter].label }}
          </option>
          <option
            v-for="(option, oIdx) in getOptions(browseFilters[filter].options)"
            :key="`${filter}-${oIdx}`"
            :value="option"
          >
            {{ `${filter} ${option}` }}
          </option>
        </select>
      </div>

      <div class="dropdown block lg:hidden">
        <summary
          tabindex="3"
          class="btn border-base-content bg-base-300 text-base-content bordered m-1 capitalize"
        >
          {{ `${selectedCompendium.split('_').join(' ')} ${menuLocation}` }}
          <Icon class="text-xl" name="ic:baseline-keyboard-double-arrow-down" />
        </summary>
        <div
          class="p-2 shadow menu dropdown-content z-[1] bg-neutral rounded-box w-fit join join-vertical"
        >
          <select
            class="select select-bordered border-base-content bg-base-300 text-base-content join-item join w-auto max-w-xs text-lg"
            v-model="selectedCompendium"
          >
            <option disabled selected>Select Compendium</option>
            <option value="csrd">CSRD Compendium</option>
            <option value="eberron">Eberron Compendium</option>
            <option value="space_jazz">Space Jazz Compendium</option>
          </select>
          <select
            v-if="collections"
            class="select select-bordered border-base-content bg-base-300 text-base-content join-item join w-auto max-w-xs text-lg capitalize"
            v-model="selectedCollection"
            @change.prevent="changeCollection"
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
            v-if="Object.keys(browseFilters).length > 0"
            v-for="(filter, fIdx) in Object.keys(browseFilters)"
            class="select select-bordered border-base-content bg-base-300 text-base-content join-item join w-full text-lg capitalize"
            v-model="browseFilters[filter].value"
            :key="`${filter}-select`"
            @change.prevent="changeFilter(filter)"
          >
            <option selected :value="null">
              Filter {{ browseFilters[filter].label }}
            </option>
            <option
              v-for="(option, oIdx) in browseFilters[filter].options"
              :key="`${filter}-${oIdx}`"
              class="capitalize"
              :value="option"
            >
              {{ `${filter} ${option}` }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
