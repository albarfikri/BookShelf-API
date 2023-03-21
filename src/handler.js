import { nanoid } from 'nanoid';
import books from './books.js';
import messageResponse from './utils.js';

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const bookId = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    bookId,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (name === '') {
    const response = h
      .response({
        ...messageResponse(
          'fail',
          'Gagal menambahkan buku. Mohon isi nama buku'
        )
      })
      .code(400);
    return response;
  }
  
  if (readPage > pageCount) {
    const response = h
      .response({
        ...messageResponse(
          'fail',
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        )
      })
      .code(400);
    return response;
  }

  books.push(newBook);
  const isSuccess = books.filter((book) => book.bookId === bookId).length > 0;

  if (isSuccess) {
    const response = h
      .response({
        ...messageResponse('success', 'Buku berhasil ditambahkan'),
        data: { bookId },
      })
      .code(201);

    return response;
  }
};

const editbook = (request, h) => {
  return 'test';
};

export { addBookHandler, editbook };
