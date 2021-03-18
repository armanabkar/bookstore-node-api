const express = require("express");
const {
  fetchCategories,
  fetchCategory,
  updateCategory,
  createCategory,
  deleteCategory,
} = require("../controllers/categories");
const router = express.Router();

router.get(`/`, fetchCategories);

router.get("/:id", fetchCategory);

router.post("/", createCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
