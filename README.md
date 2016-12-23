[![Build Status](https://travis-ci.org/composa/bookshelf-dates.svg?branch=master)](https://travis-ci.org/composa/bookshelf-dates)
[![codecov](https://codecov.io/gh/composa/bookshelf-dates/branch/master/graph/badge.svg)](https://codecov.io/gh/composa/bookshelf-dates)

## bookshelf-dates

Automatically converts SQL dates to JavaScript Date objects.

```javascript
const user = await User.where({ id: 1 }).fetch();
user.get('dateSubscribed') === new Date('1.1.2017') // true
```

### Installation

Install via npm:
```javascript
npm install --save @composa/bookshelf-dates
```

Install via Yarn:
```javascript
yarn add @composa/bookshelf-dates
```

### Usage

Register the plugin:

```javascript
import Bookshelf from 'bookshelf';
import bookshelf-dates from '@composa/bookshelf-dates';
import Knex from 'knex';
import knexfile from './knexfile';

const knex = Knex(knexfile);
const bookshelf = Bookshelf(knex);

bookshelf.plugin(dates, { fields: ['dateCreated', 'dateDeleted'] });
```

Enable it on your models:

```javascript
const User = bookshelf.Model.extend({
    tableName: 'users',
    convertDates: true
});
```

You can also define local settings:

```javascript
const User = bookshelf.Model.extend({
    tableName: 'users',
    convertDates: ['dateSubscribed']
});
```

### Testing

```bash
git clone git@github.com:composa/bookshelf-dates.git
cd bookshelf-dates && yarn install && yarn test
```
