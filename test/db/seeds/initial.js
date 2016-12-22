const entities = [
    {
        id: 1,
        dateDeleted: null,
        dateRenamed: null
    },
    {
        id: 2,
        dateDeleted: 1483225200000, // 1.1.2017
        dateRenamed: null
    },
    {
        id: 3,
        dateDeleted: null,
        dateRenamed: 1483225200000
    },
    {
        id: 4,
        dateDeleted: 1483225200000,
        dateRenamed: 1483225200000
    }
];

export function seed(knex: Function): Object {
    return knex('entities').insert(entities);
}
