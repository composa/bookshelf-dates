import convertToDate from './convertToDate';

describe('convertToDate', () => {
    it('should convert a single date', () => {
        const date = 1483225200000;
        const result = convertToDate(date);

        return expect(result, 'to equal', new Date('1.1.2017'));
    });

    it('should convert a single iso string', () => {
        const date = '2016-12-31T23:00:00.000Z';
        const result = convertToDate(date);

        return expect(result, 'to equal', new Date('1.1.2017'));
    });

    it('should return null if undefined date is supplied', () => {
        const date = undefined;
        const result = convertToDate(date);

        return expect(result, 'to equal', null);
    });

    it('should return null if null is supplied', () => {
        const date = null;
        const result = convertToDate(date);

        return expect(result, 'to equal', null);
    });
});
