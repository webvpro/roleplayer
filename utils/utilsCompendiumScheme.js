export default function (character = {}) {
  const scheme = {
    required: ['compendiumName'],
    properties: {
      compendiumName: {
        type: 'string',
        minLength: 4,
        description: "The Compendium's name",
      },
      compendiumDescription: {
        title: 'Description',
        type: 'string',
        description: "the task's name",
      },
    },
  };
  const uiScheme = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/compendiumName',
        label: 'Compendium Name',
      },
      {
        type: 'Control',
        scope: '#/properties/compendiumDescription',
        label: 'Description',
        options: {
          multi: true,
        },
      },
    ],
  };

  return {
    scheme,
    uiScheme,
  };
}
