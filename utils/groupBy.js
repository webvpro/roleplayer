export default function (data, key, groupOptions) {
  const dataMap = Object.entries(data);
  const dataArray = Array.from(dataMap);
  const newGroupingArray = [];

  const grpMin = groupOptions.find(grp => grp.groupsMin)['groupsMin'] ?? null;
  const groupData = grpMin
    ? Array.from({length: grpMin}, (itm, idx) => {
        return {key: `${key}-${idx + 1}`};
      })
    : groupOptions;

  groupData.forEach((grp, gIdx) => {
    const grpNum = gIdx + 1;
    const newItemArray = new Array();
    dataArray
      .filter(itm => {
        return itm[1][key] == grpNum;
      })
      .map(itm => {
        newItemArray.push({key: itm[0], ...itm[1]});
      });
    newGroupingArray.push({
      key: `${key}-${grpNum}`,
      groupData: grp,
      items: newItemArray,
    });
  });
  function replacer(key, value) {
    if (value instanceof Map) {
      return Object.fromEntries(value); // or with spread: value: [...value]
    } else {
      return value;
    }
  }

  return newGroupingArray;
}
