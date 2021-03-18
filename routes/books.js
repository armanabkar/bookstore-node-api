const express = require("express");
const router = express.Router();
const {
  fetchBook,
  fetchBooks,
  updateBook,
  createBook,
  deleteBook,
  fetchBooksCount,
  fetchFeaturedBooksCount,
} = require("../controllers/books");
const uploadOptions = require("../helpers/multer");

router.get(`/`, fetchBooks);

router.get(`/:id`, fetchBook);

router.post(`/`, uploadOptions.single("image"), createBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

router.get(`/get/count`, fetchBooksCount);

router.get(`/get/featured/:count`, fetchFeaturedBooksCount);

module.exports = router;
