export function up(knex) {
    return knex.schema.createTableIfNotExists('entities', (table) => {
        table.increments('id')
            .primary()
            .unique()
            .notNullable();
        table.timestamp('dateCreated').defaultTo(knex.fn.now());
        table.timestamp('dateDeleted').nullable();
        table.timestamp('dateRenamed').nullable();
    });
}

export function down(knex) {
    return knex.schema.dropTableIfExists('entities');
}
