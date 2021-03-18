const express = require("express");
const {
  fetchUsers,
  fetchUser,
  register,
  updateUser,
  login,
  deleteUser,
  fetchUsersCount,
} = require("../controllers/users");
const router = express.Router();

router.get(`/`, fetchUsers);

router.get("/:id", fetchUser);

router.post("/register", register);

router.put("/:id", updateUser);

router.post("/login", login);

router.delete("/:id", deleteUser);

router.get(`/get/count`, fetchUsersCount);

module.exports = router;
