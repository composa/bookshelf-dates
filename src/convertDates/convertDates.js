import { assoc, isEmpty, isNil, reduce } from 'ramda';

import convertToDate from '../convertToDate';

export default function convertDates(props: Array<string>): Function {
    return (attrs: Object): Object => {
        if (isNil(attrs) || isEmpty(attrs)) return attrs;

        return reduce(
            (acc: Object, prop: string): Object => assoc(prop, convertToDate(acc[prop]), acc),
            attrs,
            props
        );
    };
}
