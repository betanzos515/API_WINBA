const { authJwt, verifyCFDI } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  //Test Routes
  app.get("/api/test/all", controller.allAccess);
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/test/developer",
    [authJwt.verifyToken, authJwt.isDeveloper],
    controller.developerBoard
  );

  app.get(
    "/api/test/tester",
    [authJwt.verifyToken, authJwt.isTester],
    controller.testerBoard
  );
  
  //CFDI Routes
  app.post(
    "/api/CFDI/valida",
    [authJwt.verifyToken, authJwt.isDeveloper],
    verifyCFDI.xmlValidation
  );
};