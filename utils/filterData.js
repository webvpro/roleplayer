export default function (data, filters) {
  const dataMap = Object.entries(data);
  const dataArray = Array.from(dataMap);
  const filterValues = {};
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

  console.log('filter values', filterValues);
  let newItemArray = dataArray;
  console.log('filter keys val', filterValues['category']);
  Object.keys(filterValues).forEach(filter => {
    newItemArray = newItemArray.filter(itm => {
      const item = itm[1][filter];
      if (!item) return false;
      if (
        Array.isArray(item) &&
        item.includes(filterValues[filter].toUpperCase())
      ) {
        return true;
      } else if (
        !Array.isArray(item) &&
        item.toUpperCase() === filterValues[filter].toUpperCase()
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
  console.log('filtered data', newItemArray);
  return data;
}
