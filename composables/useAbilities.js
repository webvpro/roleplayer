export const useAbilities = (abilitiesData, opts = {}) => {
  const abilities = computed(() => abilitiesData.value.data);
  return {abilities};
};
