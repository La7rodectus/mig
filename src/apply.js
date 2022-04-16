const t = {
  actionType: 'create', //create, update, delete,
  entityType: 'table',
  opts: {
    name: 'users',
    columns: {
      'example': {
        type: 'int',
        pk: true,
        inc: true
      }
    }
  }
};


function applyMigration(migration) {

}


module.exports = applyMigration;

