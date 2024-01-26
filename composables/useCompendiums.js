export const useCompendiums = key => {
  return useState(key, () => undefined);
};

export const useCompendium = (id = null) => {
  const {storage} = useAppwrite();
  const config = useRuntimeConfig();
  const fileID = ref(id ?? config.public.CSRD_COMPENDIUM_FILE_ID);
  const compendium = useCompendiums(fileID.value);

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

  async function fetchCompendium(options = {}) {
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
  function getCollection(key, options = {}) {
    const collection = compendium.value[key];
    if (collection) {
      console.log('GET and Sort', key);
      collection.data = mapSort(compendium.value[key].data);
    }
    if (Object.keys(options).length > 0) {
      console.log(`Options for ${key}`, options);
    }

    return collection;
  }
  return {
    compendium,
    fetchCompendium,
    collections,
    collection,
    getCollection,
  };
};
