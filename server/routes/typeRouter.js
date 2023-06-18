const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post('/create', typeController.create);
router.get('/all', typeController.getAll);
router.delete('/delete/:id',typeController.delete);
router.put('/update/:id',typeController.update);


module.exports = router