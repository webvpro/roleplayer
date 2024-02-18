export default function (character = {}) {
  const scheme = {
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        minLength: 4,
        description: "The Compendium's name",
      },
      description: {
        type: 'string',
        description: "The Compendium's description",
      },
    },
  };
  const uiScheme = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/name',
        label: 'Compendium Name',
      },
      {
        type: 'Control',
        scope: '#/properties/description',
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
