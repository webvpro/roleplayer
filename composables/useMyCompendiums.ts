export const useMyCompendiums = key => {
  return useState(key, () => undefined);
};

export const useMyCompendium = (id = null) => {
  const {storage} = useAppwrite();
  const config = useRuntimeConfig();
  const fileID = ref(id ?? config.public.CSRD_COMPENDIUM_FILE_ID);
  const compendium = useMyCompendiums(fileID.value);
  const collections = reactive({});
  const collectionOptions = reactive({});
  const collectionKey = ref(null);
  const collectionDataFilters = reactive({});
  const collection = computed(() => {
    if (compendium.value[collectionKey.value]) {
      const sortedData = mapSort(compendium.value[collectionKey.value].data);
      compendium.value[collectionKey.value].data = sortedData;
      return compendium.value[collectionKey.value];
    }
    return {};
  });

  watch(compendium, value => {
    if (value) {
      collections.value = {...value.collections};
    }
  });

  async function fetchCompendium (options = {}) {
    //console.log(fileID.value);
    try {
      const {data: compendiumData} = await useFetch(
        storage.getFileView(
          config.public.PUBLIC_COMPENDIUMS_BUCKET,
          fileID.value,
        ),
      );

      compendium.value = JSON.parse(compendiumData.value);
      if (
        Object.keys(options).length > 0 &&
        Object.keys(options).includes('collectionKey')
      ) {
        collectionKey.value = options.collectionKey;
      }
    } catch (e) {
      console.log('fetch Comp', e);
      compendium.value = null;
    }
  }
  function getCollection (key, options = {}) {
    if (compendium.value[key]) {
      const sortedData = mapSort(compendium.value[key].data);
      compendium.value[key].data = sortedData;
      if (Object.keys(options).length > 0) {
        // where filters should go
        console.log(`Options for ${key}`, options);
        if (key == 'filters') {
          console.log(`Filters for ${key}`, options[key]);
        }
      }
      return compendium.value[key];
    }
    return {};
  }

  return {
    compendium,
    fetchCompendium,
    collections,
    collection,
    getCollection,
  };
};
function replacer (key, value) {
  if (value instanceof Map) {
    return Object.fromEntries(value); // or with spread: value: [...value]
  } else {
    return value;
  }
}
