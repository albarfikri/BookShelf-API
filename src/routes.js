import { addBookHandler, editbook } from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
];

export default routes;
