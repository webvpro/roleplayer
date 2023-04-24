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
      console.log('find chars');
      myCharacters.value = JSON.parse(localStorage.getItem(localKey));
    } catch {}

    try {
      console.log('find chars');
      myCharacters.value = JSON.parse(localStorage.getItem(localKey));
    } catch (e) {
      console.log(`loading Characters Error:${e}`);
    } finally {
      //setup and pull from load
      console.log('sync with local');
      syncCharacters();
    }
  }
  function syncCharacters() {
    if (process.client) {
      if (!myCharacters.value) {
        //init
        localStorage.setItem(localKey, JSON.stringify([]));
      } else if (!noWrite.value) {
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

    const characterIdx = myCharacters.value.find(
      char => char.id === opts.loadCharacterId,
    );

    if (!characterIdx) {
      myCharacters.value.push(character.value);
    } else if (!noWrite.value) {
      myCharacters.value[characterIdx] = character.value;
    }
    syncCharacters();
    return;
  }

  watch(character, (cv, ov) => {
    console.log('change', myCharacters.value);
    if (process.client) {
      console.log('update character change'); //call write
      updateCharacter();
    }
    return;
  });

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
