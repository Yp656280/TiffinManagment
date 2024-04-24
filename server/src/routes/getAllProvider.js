const express = require("express");
const {
  getAllProvider,
  setProvider,
} = require("../controllers/getAllProvider");

const router = express.Router();
router.route("/getAllProvider").post(getAllProvider);
router.route("/setProvider").post(setProvider);
module.exports = router;
