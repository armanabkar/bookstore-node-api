const { Book } = require("../models/book");
const { Category } = require("../models/category");
const mongoose = require("mongoose");

async function fetchBooks(req, res) {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const bookList = await Book.find(filter).populate("category");

  if (!bookList) {
    res.status(500).json({ success: false });
  }
  res.send(bookList);
}

async function fetchBook(req, res) {
  const book = await Book.findById(req.params.id).populate("category");

  if (!book) {
    res.status(500).json({ success: false });
  }
  res.send(book);
}

async function createBook(req, res) {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const file = req.file;
  if (!file) return res.status(400).send("No image in the request");

  const fileName = file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  let book = new Book({
    name: req.body.name,
    description: req.body.description,
    author: req.body.author,
    image: `${basePath}${fileName}`, // "http://localhost:3000/public/upload/image-2323232"
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  book = await book.save();

  if (!book) return res.status(500).send("The book cannot be created");

  res.send(book);
}

async function updateBook(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Book Id");
  }
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      author: req.body.author,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!book) return res.status(500).send("the book cannot be updated!");

  res.send(book);
}

async function deleteBook(req, res) {
  Book.findByIdAndRemove(req.params.id)
    .then((book) => {
      if (book) {
        return res
          .status(200)
          .json({ success: true, message: "the book is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "book not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
}

async function fetchBooksCount(req, res) {
  const bookCount = await Book.countDocuments((count) => count);

  if (!bookCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    bookCount: bookCount,
  });
}

async function fetchFeaturedBooksCount(req, res) {
  const count = req.params.count ? req.params.count : 0;
  const books = await Book.find({ isFeatured: true }).limit(+count);

  if (!books) {
    res.status(500).json({ success: false });
  }
  res.send(books);
}

module.exports = {
  fetchBook,
  fetchBooks,
  createBook,
  updateBook,
  deleteBook,
  fetchBooksCount,
  fetchFeaturedBooksCount,
};
