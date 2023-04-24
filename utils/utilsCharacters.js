export default function () {
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
      tier: [],
      effort: 0,
      descriptors: [
        {
          sourceKey: '',
          alias: '',
          description: '',
          features: [],
          starters: [],
        },
      ],
      types: [
        {
          sourceKey: '',
          alias: '',
          tiers: [{key: 1, swaps: [], selections: []}],
        },
      ],
      foci: [],
      powerShifts: [],
      skills: [],
      attacks: [],
      background: '',
      arcs: [],
      notes: [],
      equipment: {
        assets: [],
        cyphers: [],
        artifacts: [],
        armor: [],
      },
    };
  };

  return {initCharacter};
}
