import compendiumJSON from '@/JSON/CSRD/CSRD-FULL.json';
import collectionsJSON from '@/JSON/CSRD/csrd_collections.json';
import csrdTypesJSON from '@/JSON/CSRD/csrdTypes.json';
import csrdAbilitiesJSON from '@/JSON/CSRD/csrdAbilities.json';
import csrdFociJSON from '@/JSON/CSRD/csrdFoci.json';
import csrdDescriptorsJSON from '@/JSON/CSRD/csrdDescriptors.json';
import csrdFlavorsJSON from '@/JSON/CSRD/csrdFlavors.json';
import csrdCyphersJSON from '@/JSON/CSRD/csrdCyphers.json';
import csrdArtifactsJSON from '@/JSON/CSRD/csrdArtifacts.json';
export const useCollections = key => {
  return useState(key, () => undefined);
};
export const useCompendiums = key => {
  return useState(key, () => undefined);
};
export const useCompendium = (key = 'csrd') => {
  const compendium = useCompendiums(key);
  const collections = reactive(collectionsJSON);
  const compendiumInit = {
    name: key,
    description: '',
    collections: {
      types: {
        name: 'Types',
        description:
          "A type is the basis upon which a whole character is built, it's important to consider how the type relates to the chosen setting. To help with this, types are actually general archetypes.",
        items: csrdTypesJSON,
      },
      abilities: {
        name: 'Abilities',
        description:
          "A character's type, flavor, and focus assign an appropriate tier to each ability.",
        items: csrdAbilitiesJSON,
      },
      foci: {
        name: 'Foci',
        description:
          'The foci in this compendium have been purposely stripped down to basics so they have the widest possible application across multiple genres. A single descriptive sentence or two summarizes each one. After you choose a focus, you have the option to expand its presentation by adding more story and description relevant to the world or to the character',
        items: csrdFociJSON,
      },
      descriptors: {
        name: 'Descriptors',
        description:
          'The descriptor defines a character, it flavors everything they do. The differences between a Charming Explorer and a Vicious Explorer are considerable. The descriptor changes the way those characters go about every action. Your descriptor places your character in the situation (the first adventure, which starts the campaign) and helps provide motivation. It is the adjective of the sentence "I am an adjective noun who verbs."',
        items: csrdDescriptorsJSON,
      },
      flavors: {
        name: 'Flavors',
        description:
          'Flavors are groups of special abilities the GM and players can use to alter a character type to make it more to their liking or more appropriate to the genre or setting. For example, if a player wants to create a magic-using thief character, she could play an Adept with stealth flavoring. In a science fiction setting, a Warrior might also have knowledge of machinery, so the character could be flavored with technology.',
        items: csrdFlavorsJSON,
      },
      cyphers: {
        name: 'Cyphers',
        description:
          'Cyphers are one-use abilities that characters gain over the course of play. They have cool powers that can heal, make attacks, ease or hinder task rolls, or (in a more supernatural and extreme example) produce effects such as nullifying gravity or turning something invisible.',
        items: csrdCyphersJSON,
      },
      artifacts: {
        name: 'Artifacts',
        description:
          'Cyphers are one-use abilities that characters gain over the course of play. They have cool powers that can heal, make attacks, ease or hinder task rolls, or (in a more supernatural and extreme example) produce effects such as nullifying gravity or turning something invisible.',
        items: csrdArtifactsJSON,
      },
    },
  };
  compendium.value = compendiumInit;

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
