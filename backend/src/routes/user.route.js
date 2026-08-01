const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const { protect, authorize } = require("../middleware/auth");

router.post("/", protect, authorize("admin"), createUser);

router.get("/", protect, authorize("admin", "manager"), getUsers);

router.get("/:id", protect, authorize("admin", "manager"), getUserById);

router.put("/:id", protect, authorize("admin"), updateUser);

router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
