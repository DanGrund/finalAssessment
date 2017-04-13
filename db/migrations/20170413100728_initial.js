exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('garage', function(table) {
            table.increments('id').primary();
            table.string('name');
            table.string('reason');
            table.string('cleanliness');
            table.timestamps();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('garage'),
    ])
};
