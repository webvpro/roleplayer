export const useCharacters = () => {
  return useState('characters', () => []);
};
export const useCharacter = () => {
  return useState('character', () => undefined);
};

export const useMyCharacter = (opts = {}) => {
  const myCharacters = useCharacters();
  const character = useCharacter();
  const noWrite = ref(false);
  const localKey = 'pc-characters';
  function loadMyCharacters(key = '') {
    try {
      console.log(`Load Local from ${localKey}`);
      myCharacters.value = JSON.parse(localStorage.getItem(localKey));
    } catch (e) {
      console.log(`loading local Characters from ${localKey} Error:${e}`);
    } finally {
      syncCharacters();
    }
  }
  function syncCharacters() {
    if (process.client) {
      console.log(`Sync With LocalKey ${localKey}`);
      if (!myCharacters.value) {
        console.log('Setup Localkey');
        localStorage.setItem(localKey, JSON.stringify([]));
      } else if (!noWrite.value) {
        console.log(`write to local ${localKey} value:`, myCharacters.value);
        localStorage.setItem(localKey, JSON.stringify(myCharacters.value));
      }
      console.log('loading for storage');
      noWrite.value = false;
      myCharacters.value = JSON.parse(localStorage.getItem(localKey));
    }
  }

  function loadCharacter(id) {
    noWrite.value = true;
    console.log('load character by id');
    character.value = myCharacters.value.find(char => char.id === id);
  }

  function updateCharacter() {
    if (!character.value) return;
    const allCharacters = myCharacters.value;
    const characterIdx = allCharacters
      .map(function (el) {
        return el.id;
      })
      .indexOf(character.value.id);
    console.log('local character idx', characterIdx);
    if (characterIdx < 0) {
      myCharacters.value.push(character.value);
    } else if (!noWrite.value) {
      myCharacters.value[characterIdx] = character.value;
    }
    syncCharacters();
    return;
  }

  watch(
    character,
    (cv, ov) => {
      console.log('change', cv);
      if (process.client) {
        console.log('update character change'); //call write
        updateCharacter();
      }
    },
    {deep: true},
  );

  onMounted(() => {
    loadMyCharacters();
    if (opts.loadCharacterId) {
      if (process.client) {
        loadCharacter(opts.loadCharacterId);
      }
    }
  });

  return {myCharacters, character};
};
