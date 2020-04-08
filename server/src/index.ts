import { getNode } from './server';
import { config } from './config';

// read .env as soon as possible
require('dotenv').config();

if (config().pigeonholeServer === 'node') {
  getNode().start(() =>
    console.log(`🚀 Server ready at: http://localhost:4000`),
  );
}
