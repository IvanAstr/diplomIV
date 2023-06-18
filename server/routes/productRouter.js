const Router = require("express")
const router = new Router();
const productController = require("../controllers/productController")
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/create", productController.create)
router.get("/all", productController.getAll)

router.get("/all2", productController.getAll2)

router.get("/:id", productController.getOne)
router.delete('/delete/:id', productController.delete);
router.put('/:id',productController.update);


module.exports = router