export const useCompendiums = key => {
  return useState(key, () => undefined);
};
export const useCompendium = (id = null) => {
  const {storage} = useAppwrite();
  const config = useRuntimeConfig();
  const fileID = ref(id ?? config.public.CSRD_COMPENDIUM_FILE_ID);
  const compendium = useCompendiums(fileID.value);

  const collections = reactive({});

  watch(compendium, value => {
    if (value) {
      collections.value = {...value.collections};
    }
  });

  async function fetchCompendium() {
    try {
      const {data: compendiumData} = await useFetch(
        storage.getFileView(
          config.public.PUBLIC_COMPENDIUMS_BUCKET,
          fileID.value,
        ),
      );
      compendium.value = JSON.parse(compendiumData.value);
    } catch (e) {
      console.log('ERROR:fetchCompendium', e);
      compendium.value = null;
    }
  }

  return {
    compendium,
    fetchCompendium,
    collections,
  };
};
