import compendiumJSON from "@/JSON/CSRD/CSRD-FULL.json";
export const useCompendium = (key) => {
  return useState(key, () => undefined);
};
export const useCompendiums = () => {
  const compendium = useCompendium("csrd");
  const getCompendium = () => {
    compendium.value = compendiumJSON;
    console.log(compendium.value);
  };
  const getCollection = (key) => {
    return compendium.value[key];
  };

  const getCollectionItem = (type, id) => {
    return getCollection(type).find((item) => item.name == id);
  };

  const getSelectedItems = (key, ids = []) => {
    return getCollection(key).filter((item) => ids.includes(item.name));
  };

  return {
    compendium,
    getCompendium,
    getCollection,
    getCollectionItem,
    getSelectedItems,
  };
};
