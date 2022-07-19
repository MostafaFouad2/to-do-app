const controller = require("../controllers/tasks.controller");
const { authJwt } = require("../middleware");
const express = require("express");
const router = express.Router();

router.post("/tasks",authJwt.verifyToken, controller.newTask);

router.get("/tasks",authJwt.verifyToken, controller.getTasks);

router.put("/tasks/:id",authJwt.verifyToken, controller.upTask);

router.delete("/tasks/:id",authJwt.verifyToken,controller.delTask);

module.exports = router;