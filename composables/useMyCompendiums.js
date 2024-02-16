export const useMyCompendiums = () => {
  return useState('myCompendiums', () => undefined);
};

export const useMyCompendium = (id = null) => {
  const {account, functions} = useAppwrite();
  const {compendium: staticCompendium, fetchCompendium} = useCompendium();
  const compendiums = useMyCompendiums();
  const {user} = computed(() => useAuth());

  async function fetchMyCompendiums(options = {}) {
    console.log('get itx');
    try {
      const execution = await functions.createExecution(
        'COMPENDIUMS',
        JSON.stringify({}),
        false,
        '/',
        'GET',
        {},
      );
      compendiums.value = execution;
    } catch (error) {
      console.error('Error fetching Compendiums', error);
    }
  }
  async function createNewCompendiums() {}
  onMounted(async () => {
    await fetchMyCompendiums();
    await fetchCompendium();
  });

  return {
    compendiums,
    fetchMyCompendiums,
  };
};
function replacer(key, value) {
  if (value instanceof Map) {
    return Object.fromEntries(value); // or with spread: value: [...value]
  } else {
    return value;
  }
}
