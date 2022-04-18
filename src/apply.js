const actions = require('./actions');

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


async function applyMigration(migration) {
  const entityActions = actions[migration.entityType];
  if (!entityActions) throw new SyntaxError('Unknown entity!');

  const action = entityActions[migration.actionType];
  if (!action) throw new SyntaxError('Unknown action!');

  try {
    const res = await action(migration);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}


applyMigration(t);

module.exports = applyMigration;

