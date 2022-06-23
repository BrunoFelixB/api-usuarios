const express = require("express");
const router = express.Router();
const controller = require("../controllers/userControllers");
const authController = require("../controllers/authControllers");

router.get("/", controller.home);
router.post("/create", controller.createUser);
router.post('/login', authController.login)

router.post("/produtos/criar", authController.checkToken, controller.createProductor)
router.patch("/produtos/editar", authController.checkToken, controller.updateProductor)
router.get("/produtos/all", authController.checkToken, controller.getAll)
router.delete("/produtos/delete/:id", authController.checkToken, controller.deleteById)

module.exports = router