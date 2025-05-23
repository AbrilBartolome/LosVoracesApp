const express = require('express');
const router = express.Router();
const BookController = require('../controller/BookController');

router.get('/', BookController.getBooks);
router.post('/', BookController.createBook);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

module.exports = router;