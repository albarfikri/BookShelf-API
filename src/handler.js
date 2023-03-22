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

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
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
        ),
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
        ),
      })
      .code(400);
    return response;
  }

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;
  const bookId = id;

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

const getBooksHandler = (request, h) => {
  const response = h.response({
    ...messageResponse('success'),
    data: {
      books: books.map(function (book) {
        return {
          id: `${book.id}`,
          name: `${book.name}`,
          publisher: `${book.publisher}`,
        };
      }),
    },
  });

  return response;
};

const getBookDetailByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((b) => b.id == bookId)[0];

  if (book !== undefined) {
    return {
      ...messageResponse('success'),
      data: {
        book,
      },
    };
  }

  const response = h
    .response({
      ...messageResponse('fail', 'Buku tidak ditemukan'),
    })
    .code(404);

  return response;
};

const updateBookHandler = (request, h) => {
  const { bookId } = request.params;

  const id = bookId;

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

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    if (name === '') {
      const response = h
        .response({
          ...messageResponse(
            'fail',
            'Gagal memperbarui buku. Mohon isi nama buku'
          ),
        })
        .code(400);
      return response;
    }
    if (readPage > pageCount) {
      const response = h
        .response({
          ...messageResponse(
            'fail',
            'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
          ),
        })
        .code(400);
      return response;
    }
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const response = h.response({
      ...messageResponse('success', 'Buku berhasil diperbarui'),
    });
    return response;
  } else {
    const response = h
      .response({
        ...messageResponse(
          'fail',
          'Gagal memperbarui buku. Id tidak ditemukan'
        ),
      })
      .code(404);
    return response;
  }
};

const deleteBookHandler = (request, h) => {
  const {bookId} = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index != -1) {
    books.splice(index, 1);
    const response = h.response({
      ...messageResponse('success', 'Buku berhasil dihapus'),
    });
    return response;
  } else {
    const response = h
      .response({
        ...messageResponse('fail', 'Buku gagal dihapus. Id tidak ditemukan'),
      })
      .code(404);
    return response;
  }
};

export {
  addBookHandler,
  getBooksHandler,
  getBookDetailByIdHandler,
  updateBookHandler,
  deleteBookHandler,
};
