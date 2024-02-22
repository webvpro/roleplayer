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
  async function createCompendium(options = {}) {
    const queryParams = {...options.queryParams} ?? {};
    try {
      await functions.createExecution(
        '65cea1a226bc762d4c1f',
        JSON.stringify(queryParams),
        false,
        '/',
        'POST',
        {},
      );
      await fetchMyCompendiums();
    } catch (error) {
      console.error('Error fetching Compendiums', error);
    }
  }
  async function createNewCompendiums() {}
  onMounted(async () => {
    await fetchCompendium();
    await fetchMyCompendiums();
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
