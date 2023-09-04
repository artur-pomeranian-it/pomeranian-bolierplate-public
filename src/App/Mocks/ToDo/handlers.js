import { rest } from 'msw';
import { testData } from './testData';

export const baseURL = 'http://localhost:3333';
export const basePath = `${baseURL}/api/todo`;
export const DELAY = 10;

const mockGet = rest.get(basePath, (_req, res, ctx) => {
  return res(ctx.delay(DELAY), ctx.json(testData));
});
const mockPost = rest.post(basePath, (req, res, ctx) => {
  return res(ctx.delay(DELAY), ctx.json({ title: 'TEST' }));
});
const mockDelete = rest.delete(`${basePath}/:id`, (req, res, ctx) => {
  const { id } = req.params;
  return res(ctx.delay(DELAY), ctx.json({ id }));
});

const handlers = [mockGet, mockPost, mockDelete];
export default handlers;
