exports.seed = function(knex, Promise) {
  return knex('garage').del()
  .then(() => {
    return Promise.all([
      knex('garage').insert({
        name: 'baseball',
        reason: 'I like baseball',
        cleanliness: 'sparkling'
      }),
      knex('garage').insert({
        name: 'tennis ball',
        reason: 'I like tennis',
        cleanliness: 'rancid'
      })
    ]);
  });
};
