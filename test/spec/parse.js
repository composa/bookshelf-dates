import { assoc, clone } from 'ramda';
import { bookshelf as orm, knex } from '../db';

import dates from '../../src';

describe('parse', () => {
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

    it('should not override a custom parse function', () => {
        // GIVEN field is config set to dateDeleted and dateRenamed
        bookshelf.plugin(dates, { fields: ['dateDeleted', 'dateRenamed'] });
        // AND convertDates is set
        // AND custom parse function is set
        const model = bookshelf.Model.extend({
            tableName: 'entities',
            convertDates: true,
            parse: assoc('customAttribut', 'customValue')
        });

        return expect(
            // WHEN model is feched
            model.where({ id: 4 }).fetch(),
            'when fulfilled',
            // THEN dateDeleted and dateRenamed sould be a Object
            // AND customAttribut should be set
            'to satisfy', {
                attributes: {
                    customAttribut: 'customValue',
                    dateDeleted: new Date('1.1.2017'),
                    dateRenamed: new Date('1.1.2017')
                }
            }
        );
    });

    it('should not assume anything about the parse function', () => {
        // GIVEN field is config set to dateDeleted and dateRenamed
        bookshelf.plugin(dates, { fields: ['dateDeleted', 'dateRenamed'] });
        // AND convertDates is set
        // AND custom parse function is set
        const model = bookshelf.Model.extend({
            tableName: 'entities',
            convertDates: true,
            parse: () => ({ customAttribut: 'customValue' })
        });

        return expect(
            // WHEN model is feched
            model.where({ id: 4 }).fetch(),
            'when fulfilled',
            // THEN dateDeleted and dateRenamed sould be a Object
            // AND customAttribut should be set
            'to satisfy', {
                attributes: {
                    customAttribut: 'customValue'
                }
            }
        );
    });

    it('should work without config', () => {
        // GIVEN field config is not set
        bookshelf.plugin(dates);
        // AND convertDates is set to dateDeleted
        const model = bookshelf.Model.extend({
            tableName: 'entities',
            convertDates: ['dateDeleted']
        });

        return expect(
            // WHEN model is feched
            model.where({ id: 4 }).fetch(),
            'when fulfilled',
            // THEN dateDeleted sould be a Object
            'to satisfy', {
                attributes: {
                    dateDeleted: new Date('1.1.2017')
                }
            }
        );
    });
});
