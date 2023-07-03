const auth = require("./auth.verify");
module.exports = app => {
    const items = require("../controllers/item.controller.js");
  
    var router = require("express").Router();
    router.post("/", [auth.verifyToken], items.create);
    router.get("/", items.findAll);
    router.get("/:id", items.findOne);
    router.put("/:id", [auth.verifyToken], items.update);
    router.delete("/:id", [auth.verifyToken], items.delete);
  
    app.use('/api/food', router);
  };