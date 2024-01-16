export default function (character = {}) {
  const initCharacter = (cId, cName) => {
    return {
      id: cId,
      name: cName,
      url: '',
      advancements: [],
      pools: [
        {key: 'might', value: 0, current: 0, edge: 0},
        {key: 'speed', value: 0, current: 0, edge: 0},
        {key: 'intellect', value: 0, current: 0, edge: 0},
      ],
      recovery: {
        die: 1,
        mod: 1,
        rest: [
          {id: 'rest_action', label: 'Action', used: false},
          {id: 'rest_10_mins', label: '10 mins', used: false},
          {id: 'rest_1_hour', label: '1 Hour', used: false},
          {id: 'rest_10_hours', label: '10 hours', used: false},
        ],
        damage: [
          {id: 'damage_impaired', label: 'Impaired', inflected: false},
          {id: 'damage_debilitated', label: 'Debilitated', inflected: false},
        ],
      },
      xp: 0,
      abilities: [],
      tiers: [],
      effort: 0,
      descriptors: [],
      types: [],
      foci: [],
      powerShifts: [],
      skills: [],
      attacks: [],
      background: '',
      sentence: '',
      arcs: [],
      notes: [],
      equipment: {
        assets: [],
        cyphers: [],
        artifacts: [],
      },
    };
  };

  const initType = {
    sourceKey: '',
    alias: '',
    tiers: [{key: 1, swaps: [], selections: []}],
  };

  const initDescriptor = {
    sourceKey: '',
    alias: '',
    description: '',
    features: [],
    starters: [],
  };

  const initFocus = {
    source: '',
    name: '',
    alias: '',
    description: '',
    selections: [],
  };

  const initFlavor = {
    sourceKey: '',
    name: '',
    alias: '',
    description: '',
    selections: [],
  };
  const initTier = {
    tier: '',
    name: '',
    advancements: [],
  };
  const initAdvancement = {
    name: '',
    description: [],
  };
  const initCollectionItem = {
    source: '',
    kind: '',
    og: {},
    custom: {},
  };
  const getSelectedItemsListText = (
    items = [],
    noItemText = 'None',
    itemLabel = 'name',
  ) => {
    let itemNames = [];
    items.map(d => {
      console.log(d);
      if (d[itemLabel]) {
        itemNames.push(d[itemLabel]);
      } else {
        error.log(' error', Object.keys(d));
      }
    });
    return itemNames.length ? itemNames : noItemText;
  };

  return {
    initCharacter,
    initType,
    initDescriptor,
    initFlavor,
    initFocus,
    initTier,
    getSelectedItemsListText,
  };
}
