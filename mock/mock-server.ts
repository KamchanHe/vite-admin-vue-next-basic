import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import userMock from './user';
import tableMock from './table';

export function setupProdMockServer() {
  createProdMockServer([...userMock, ...tableMock]);
}
