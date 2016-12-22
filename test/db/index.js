import Knex from 'knex';

import knexfile from './knexfile';
import Bookshelf from 'bookshelf';

const db = process.env.DB || 'memory';

export const knex = Knex(knexfile[db]);
export const bookshelf = Bookshelf(knex);
