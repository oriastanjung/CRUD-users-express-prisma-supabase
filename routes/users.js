const express = require("express");
const {
  getAllUsers,
  getOneUser,
  deleteOneUser,
  createOneUser,
  updateOneUser,
} = require("../controller/users");
const upload = require("../middleware/multer");
const router = express.Router();

/* GET users listing. */
router.get("/", getAllUsers);
router.post("/", upload.single("profil"), createOneUser);
router.put("/:id", upload.single("profil"), updateOneUser);
router.get("/:id", getOneUser);
router.delete("/:id", deleteOneUser);

module.exports = router;
