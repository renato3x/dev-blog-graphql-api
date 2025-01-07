import 'reflect-metadata';
import 'dotenv/config';

import { server } from './server';
import { dataSource } from '@database/data-source';
import { logger } from '@logger';

dataSource.initialize()
.then(() => {
  logger.info('Server connected to the database')
  server();
})
.catch((error) => {
  logger.error('Unexpected error at connecting to database', error);
});
