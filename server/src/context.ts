import { PrismaClient } from '@prisma/client';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { Request } from 'express';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  request: Request;
}

export const createContext = (request: ContextParameters) => ({
  ...request,
  prisma,
});
