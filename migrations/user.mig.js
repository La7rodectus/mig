/**
 * ### SIGNATURE ###
 *
 * --- CREATE ---
 * {
 * table: 'User',
 * actionType: actions.CREATE
 * entityType: 'table'
 * options: {
 *
 * }
 *
 */


module.exports = (types, actions, entities) => [{
  do: [{
    table: 'User',
    actionType: actions.CREATE, //create, update, delete,
    entityType: entities.TABLE,
    columns: {
      'id': {
        type: types.INT,
        pk: true,
        inc: true,
      }
    }
  }],
  undo: [{
    actionType: actions.DELETE, //create, update, delete,
    entityType: entities.TABLE,
    name: 'as'
  }],
}];
