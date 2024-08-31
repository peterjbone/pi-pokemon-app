const { Router } = require("express");
const { getAllTypes } = require("../controllers/typeController.js");
const router = Router();

router.get("/");

module.exports = router;
