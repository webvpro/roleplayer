import compendiumJSON from '@/JSON/CSRD/CSRD-FULL.json';
import collectionsJSON from '@/JSON/CSRD/csrd_collections.json';
export const useCollections = key => {
  return useState(key, () => undefined);
};
export const useCompendiums = key => {
  return useState(key, () => undefined);
};
export const useCompendium = (key = 'csrd') => {
  const compendium = useCompendiums(key);
  const collections = reactive(collectionsJSON);
  compendium.value = compendiumJSON;
  //collections.value = collectionsJSON;

  const getCollection = key => {
    return compendium.value[key];
  };

  const getCollectionItem = (type, id) => {
    return getCollection(type).find(item => item.name == id);
  };

  const getSelectedItems = (key, ids = []) => {
    return getCollection(key).filter(item => ids.includes(item.name));
  };

  return {
    compendium,
    getCollection,
    getCollectionItem,
    getSelectedItems,
    collections,
  };
};
