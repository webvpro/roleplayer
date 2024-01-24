export default function (unSorted, sortBy = null, direction = 'desc') {
  const sortedArray = Object.entries(unSorted).sort(
    ([key1, value1], [key2, value2]) => {
      if (!sortBy) {
        return direction === 'desc'
          ? key1.localeCompare(key2)
          : key2.localeCompare(key1);
      } else {
        return direction === 'desc'
          ? value1[sortBy].localeCompare(value2[sortBy])
          : value2[sortBy].localeCompare(value1[sortBy]);
      }
    },
  );
  function replacer(key, value) {
    if (value instanceof Map) {
      return Object.fromEntries(value); // or with spread: value: [...value]
    } else {
      return value;
    }
  }
  const newSortedMap = new Map();
  // fix the sorted array to match the original unSorted v-if array of objects compatible format
  Object.entries(sortedArray).map(item => {
    newSortedMap.set(item[1][0], item[1][1]);
  });
  const newJSON = JSON.stringify(newSortedMap, replacer);
  return JSON.parse(newJSON);
}

//
