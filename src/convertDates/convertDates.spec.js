import convertDates from './convertDates';

describe('convertDates', () => {
    it('should convert all defined dates', () => {
        const attrs = {
            dateDeleted: 1483225200000,
            dateRenamed: 1483225200000
        };

        const converter = convertDates(['dateDeleted']);
        const result = converter(attrs);

        return expect(result, 'to equal', {
            dateDeleted: new Date('1.1.2017'),
            dateRenamed: 1483225200000
        });
    });
});
