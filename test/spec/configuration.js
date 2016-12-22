import { clone } from 'ramda';
import { bookshelf as orm, knex } from '../db';

import dates from '../../src';

describe('configuration', () => {
    // eslint-disable-next-line immutable/no-let
    let bookshelf = null;

    before(() => {
        return knex.migrate.rollback()
            .then(() => knex.migrate.latest())
            .then(() => knex.seed.run());
    });

    beforeEach(() => {
        bookshelf = clone(orm);
    });

    it('should convert all globally configured dates', () => {
        // GIVEN field config set to dateDeleted and dateRenamed
        bookshelf.plugin(dates, { fields: ['dateDeleted', 'dateRenamed'] });
        // AND convertDates is set
        const model = bookshelf.Model.extend({
            tableName: 'entities',
            convertDates: true
        });

        return expect(
            // WHEN model is feched
            model.where({ id: 4 }).fetch(),
            'when fulfilled',
            // THEN dateDeleted and dateRenamed sould be a Object
            'to satisfy', {
                attributes: {
                    dateDeleted: new Date('1.1.2017'),
                    dateRenamed: new Date('1.1.2017')
                }
            }
        );
    });

    it('should convert only configured dates', () => {
        // GIVEN field config set to dateRenamed
        bookshelf.plugin(dates, { fields: ['dateRenamed'] });
        // AND convertDates is set
        const model = bookshelf.Model.extend({
            tableName: 'entities',
            convertDates: true
        });

        return expect(
            // WHEN model is feched
            model.where({ id: 4 }).fetch(),
            'when fulfilled',
            // THEN only dateRenamed sould be a Object
            'to satisfy', {
                attributes: {
                    dateDeleted: 1483225200000,
                    dateRenamed: new Date('1.1.2017')
                }
            }
        );
    });

    it('should also convert lovally configured dates', () => {
        // GIVEN field config set to dateRenamed
        bookshelf.plugin(dates, { fields: ['dateRenamed'] });
        // AND convertDates is set to ['dateDeleted']
        const model = bookshelf.Model.extend({
            tableName: 'entities',
            convertDates: ['dateDeleted']
        });

        return expect(
            // WHEN model is feched
            model.where({ id: 4 }).fetch(),
            'when fulfilled',
            // THEN dateDeleted and dateRenamed sould be a Object
            'to satisfy', {
                attributes: {
                    dateDeleted: new Date('1.1.2017'),
                    dateRenamed: new Date('1.1.2017')
                }
            }
        );
    });

    it('should not convert any date if not locally enabled', () => {
        // GIVEN field config set to dateDeleted and dateRenamed
        bookshelf.plugin(dates, { fields: ['dateDeleted', 'dateRenamed'] });
        // AND convertDates is not set
        const model = bookshelf.Model.extend({
            tableName: 'entities'
        });

        return expect(
            // WHEN model is feched
            model.where({ id: 4 }).fetch(),
            'when fulfilled',
            // THEN dateDeleted and dateRenamed sould be a as comming from DB
            'to satisfy', {
                attributes: {
                    dateDeleted: 1483225200000,
                    dateRenamed: 1483225200000
                }
            }
        );
    });

    it('should not convert any date if not locally enabled', () => {
        // GIVEN field config set to dateDeleted and dateRenamed
        bookshelf.plugin(dates, { fields: ['dateDeleted', 'dateRenamed'] });
        // AND convertDates is set to false
        const model = bookshelf.Model.extend({
            tableName: 'entities',
            convertDates: false
        });

        return expect(
            // WHEN model is feched
            model.where({ id: 4 }).fetch(),
            'when fulfilled',
            // THEN dateDeleted and dateRenamed sould be a as comming from DB
            'to satisfy', {
                attributes: {
                    dateDeleted: 1483225200000,
                    dateRenamed: 1483225200000
                }
            }
        );
    });
});
