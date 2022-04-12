module.exports = (name, action) => `
  module.exports = (types, actions, entities) => [{
    do: [{
      actionType: ${action}, //create, update, delete,
      entityType: entities.TABLE,
      opts: {
        name: ${name},
        columns: {
          'example': {
            type: types.INT,
            pk: true,
            inc: true
          }
        }
      }
    }],
    undo: [{
      actionType: actions.DELETE, //create, update, delete,
      entityType: entities.TABLE,
      opts: {
        name: ${name}
      }
    }],
  }];
`;
