import { setupServer } from 'msw/lib/node';
import handlers from './ToDo/handlers';
// https://mswjs.io/docs/getting-started/integrate/browser#import-mocks
export const server = setupServer(...handlers);
