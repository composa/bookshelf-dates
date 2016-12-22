[![Build Status](https://travis-ci.org/composa/bookshelf-dates.svg?branch=master)](https://travis-ci.org/composa/bookshelf-dates)
[![codecov](https://codecov.io/gh/composa/bookshelf-dates/branch/master/graph/badge.svg)](https://codecov.io/gh/composa/bookshelf-dates)

Automatically converts dates. So sqlite3, postgres and mysql are unified.

### Installation

After installing `bookshelf-dates` with `yarn add -E @composa/bookshelf-dates`,
all you need to do is add it as a bookshelf plugin and enable it on your models.


```javascript
import Bookshelf from 'bookshelf';
import bookshelf-dates from '@composa/bookshelf-dates';
import Knex from 'knex';
import knexfile from './knexfile';

const db = process.env.DB || 'development';
const knex = Knex(knexfile[db]);
const bookshelf = Bookshelf(knex);

// Add the plugin
bookshelf.plugin(dates, { fields: ['dateCreated', 'dateDeleted'] });

// Enable it on your models
const User = bookshelf.Model.extend({
    tableName: 'users',
    convertDates: true
});

// You can also define local settings
const User = bookshelf.Model.extend({
    tableName: 'users',
    convertDates: ['dateSubscribed']
});
```


### Usage

Nothing fancy here, just keep using bookshelf as usual.

```javascript
// This user is indestructible
const user = await User.where({ id: 1 }).fetch();
user.get('dateSubscribed') === new Date('1.1.2017') // true
```

### Testing

```bash
git clone git@github.com:composa/bookshelf-dates.git
cd bookshelf-dates && yarn install && yarn test
```
