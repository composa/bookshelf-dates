import { concat, filter, identity, is, compose } from 'ramda';

import convertDates from '../convertDates';

export default (bookshelf, settings) => {
    const fields = settings.fields || [];

    // Save for later
    const modelPrototype = bookshelf.Model.prototype;

    // eslint-disable-next-line immutable/no-mutation
    bookshelf.Model = bookshelf.Model.extend({
        initialize() {
            Reflect.apply(modelPrototype.initialize, null, this);

            // 'convertDates' needs to be set
            if (this.convertDates) {
                const customFields = is(Array, this.convertDates) ? this.convertDates : [];
                const allFields = filter(identity, concat(fields, customFields));

                // eslint-disable-next-line immutable/no-mutation
                this.parse = compose(
                    convertDates(allFields),
                    this.parse ? this.parse : identity
                );
            }
        }
    });
};
