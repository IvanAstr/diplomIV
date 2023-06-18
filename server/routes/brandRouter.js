const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController")
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post('/create',brandController.create);
router.get('/all',brandController.getAll);
router.delete('/delete/:id',brandController.delete);
router.put('/update/:id', brandController.update);

module.exports = router