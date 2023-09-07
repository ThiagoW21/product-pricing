const { Router } = require("express");
const { validate, update } = require("../controllers/productsController");
const validateBodyMiddlware = require("../middlewares/validateBody");

const router = Router();

router.use(validateBodyMiddlware);
router.put("/update", update);
router.post("/validate", validate);

module.exports = router;
