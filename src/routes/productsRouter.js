const { Router } = require('express');
const { validate } = require('../controllers/productsController');
const validateBodyMiddlware = require('../middlewares/validateBody');

const router = Router();

router.use(validateBodyMiddlware);
router.post('/validate', validate);

module.exports = router;
