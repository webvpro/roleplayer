export default function (data, filters) {
  const dataMap = Object.entries(data);
  const dataArray = Array.from(dataMap);
  const filterValues = {};
  //  find if there are any filters
  Object.keys(filters).forEach(fKey => {
    const val = filters[fKey].value;
    if (Array.isArray(val) && val.length) {
      filterValues.push({[fKey]: val});
    } else if (val) {
      filterValues[fKey] = val;
    }
  });

  if (filters === undefined) return data;
  if (!Object.keys(filterValues).length) return data;

  let newFilteredArray = dataArray;
  console.log('filter keys val', filterValues['category']);
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
  //console.log('dataArray', dataArray);

  /*
  const filteredData = dataArray.filter(iObj => {
    Object.keys(filterValues).forEach(filter => {
      if (
        Array.isArray(iObj[1][filter]) &&
        iObj[1][filter].includes(filterValues[filter].toUpperCase())
      ) {
        return true;
      } else if (
        iObj[1][filter] &&
        iObj[1][filter].toUpperCase() === filterValues[filter].toUpperCase()
      ) {
        //console.log(iObj[1]);
        return true;
      } else {
        return false;
      }
    });
  }); */
  /*
  const filteredData = Object.entries(dataArray).filter(iObj => {
    filters.forEach(fObj => {
      if (
        iObj[1][fObj.filter] !== undefined ||
        iObj[1][fObj.filter].includes(fObj.filter.value)
      ) {
        console.log(iObj[0]);
      }
    });
  });*/
  console.log('util-filters ', filters);
  console.log('filtered data', newFilteredArray);
  console.log('pre filter data', data);
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
  console.log(JSON.parse(newFilteredJSON));
  return JSON.parse(newFilteredJSON);
}
