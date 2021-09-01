import * as sensorController from "./controllers/sensorController";
import * as plantController from "./controllers/plantController";
import * as authController from "./controllers/authController";
import * as readingController from "./controllers/readingController";
import { Express, Request, Response } from "express";
import { jwtMiddleware } from "./utils/jwt";
import { validateMiddleware } from "./utils/validation";

/**
 * Provides plants, sensors , readings and authentication related routes
 * @param app - Express router
 */
const initRoutes = (app: Express) => {
  app.route("/").get((req: Request, res: Response) => res.json(true));

  app
    .route("/plants")
    .get(jwtMiddleware, plantController.getPlants)
    .post(jwtMiddleware, plantController.postPlant);

  app
    .route("/plants/:id")
    .get(jwtMiddleware, plantController.getPlant)
    .put(jwtMiddleware, plantController.putPlant)
    .delete(jwtMiddleware, plantController.deletePlant);

  app
    .route("/sensors")
    .get(jwtMiddleware, sensorController.getSensors)
    .post(jwtMiddleware, sensorController.postSensors);

  app
    .route("/sensors/:id")
    .put(jwtMiddleware, sensorController.putSensor)
    .delete(
      jwtMiddleware,
      sensorController.deleteSensorValidator,
      validateMiddleware,
      sensorController.deleteSensor
    );

  app.get("/sensor/:id", jwtMiddleware, sensorController.getSensorByPlant);

  app.post("/register", authController.postNewUser);
  app.post("/login", authController.postRegisteredUser);
  app.route("/validate").get(jwtMiddleware, authController.postValidateToken);

  app.get("/readings/:id", jwtMiddleware, readingController.getReadings);
};

export default initRoutes;
