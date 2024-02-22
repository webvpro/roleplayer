export default function (data, filters) {
  const dataMap = Object.entries(data);
  const dataArray = Array.from(dataMap);
  const filterValues = {};
  //  find if there are any filters
  //debugger;
  if (filters === undefined) return data;
  //console.log('filterData', filters.kind);
  Object.keys(filters).forEach(fKey => {
    const val = filters[fKey]?.value ?? null;
    //console.log('filterKey val', val);
    if (val || (Array.isArray(val) && val.length)) {
      filterValues[fKey] = val;
    }
  });

  if (!Object.keys(filterValues).length) return data;
  ///console.log('filterVals', filterValues);
  let newFilteredArray = dataArray;

  Object.keys(filterValues).forEach(filter => {
    newFilteredArray = newFilteredArray.filter(itm => {
      const item = itm[1][filter];
      if (!item) return false;
      if (
        Array.isArray(item) &&
        item.includes(filterValues[filter].toUpperCase())
      ) {
        return true;
      } else if (
        !Array.isArray(item) &&
        isNaN(item) &&
        item.toUpperCase() === filterValues[filter].toUpperCase()
      ) {
        return true;
      } else if (
        !Array.isArray(item) &&
        !isNaN(item) &&
        item == filterValues[filter]
      ) {
        return true;
      }
      return false;
    });
  });

  console.log('util-filters ', filters);
  console.log('filtered data', Object.keys(newFilteredArray).length);
  console.log('pre filter data', Object.keys(data).length);
  function replacer(key, value) {
    if (value instanceof Map) {
      return Object.fromEntries(value); // or with spread: value: [...value]
    } else {
      return value;
    }
  }
  const newFilteredMap = new Map();
  // fix the sorted array to match the original unSorted v-if array of objects compatible format
  Object.entries(newFilteredArray).map(item => {
    newFilteredMap.set(item[1][0], item[1][1]);
  });
  const newFilteredJSON = JSON.stringify(newFilteredMap, replacer);
  //console.log(JSON.parse(newFilteredJSON));
  return JSON.parse(newFilteredJSON);
}
