import { glob } from "glob";
import path from "path";
import { Route } from "../Route/Route";
import RouteLoader from "../Route/RouteLoader";
import { SwaggerBuilder } from "../Swagger/Core/SwaggerBuilder";
import { SwaggerLoader } from "../Swagger/Core/SwaggerLoader";

SwaggerBuilder.Instance.addServers(["youtube.com"])
  .addApiInfo("This is title", "This is description", "1.0.0")
  .addPathFile("test.json");

const router = { get: () => {}, post: () => {}, put: () => {} };

const routes = glob.globSync(path.join(__dirname, "./routes/**.route.ts")).reduce((init, val) => {
  const route = require(val).default as Route;
  return [...init, ...route.listRoutes()];
}, [] as Route[]);

(async () => {
  await new RouteLoader({ routeHandlers: [new SwaggerLoader()] }).load(routes, router);
})();
