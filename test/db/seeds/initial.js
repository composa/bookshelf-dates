const entities = [
    {
        id: 1,
        dateDeleted: null,
        dateRenamed: null
    },
    {
        id: 2,
        dateDeleted: new Date('1.1.2017'), // 1483225200000
        dateRenamed: null
    },
    {
        id: 3,
        dateDeleted: null,
        dateRenamed: new Date('1.1.2017')
    },
    {
        id: 4,
        dateDeleted: new Date('1.1.2017'),
        dateRenamed: new Date('1.1.2017')
    }
];

export function seed(knex: Function): Object {
    return knex('entities').insert(entities);
}
