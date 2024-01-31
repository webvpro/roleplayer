export default function (data, filters) {
  const dataMap = Object.entries(data);
  const dataArray = Array.from(dataMap);
  const filterValues = new Array();
  Object.keys(filters).forEach(fKey => {
    const val = filters[fKey].value;
    if (Array.isArray(val) && val.length) {
      filterValues.push(filters[fKey]);
    } else if (val) {
      filterValues.push(filters[fKey]);
      filterValues;
    }
  });
  if (filters === undefined) return data;
  if (!filterValues.length) return data;

  const filteredData = dataMap.filter(iObj => {
    Object.keys(filters).forEach(fObj => {
      if (
        iObj[1][fObj] &&
        Array.isArray(iObj[1][fObj]) &&
        filters[fObj].value &&
        iObj[1][fObj].includes(filters[fObj].value.toUpperCase())
      ) {
        console.log(iObj[1]);
        return iObj;
      } else if (
        iObj[1][fObj] &&
        filters[fObj].value &&
        !Array.isArray(iObj[1][fObj]) &&
        iObj[1][fObj].toUpperCase() === filters[fObj].value.toUpperCase()
      ) {
        console.log(iObj[1]);
        return iObj;
      } else {
        return false;
      }
    });
  });
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
  console.log('filtered data', filteredData);
  return data;
}
