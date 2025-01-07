import 'reflect-metadata';
import 'dotenv/config';

import { server } from './server';
import { dataSource } from '@database/data-source';

dataSource.initialize()
.then(() => {
  console.log('Server connected to the database');
  server();
})
.catch((error) => {
  console.log('Unexpected error at connecting to database');
});
