import fs from "fs/promises";
import path from "path";
import RouteLoader from "../Route/RouteLoader";
import { SwaggerBuilder } from "../Swagger/Core/SwaggerBuilder";
import { SwaggerLoader } from "../Swagger/Core/SwaggerLoader";

SwaggerBuilder.Instance()
  .addServers(["youtube.com"])
  .addPathFile("test.json")
  .addApiInfo("Test title", "check description", "1.0.0");

const loader = new RouteLoader().addHandlers(new SwaggerLoader());

const request = { get: () => {}, post: () => {}, put: () => {} };

(async () => {
  // await loader.load(path.join(__dirname, "./routes/**.route.ts"), request);
  const routes = await new SwaggerLoader().load(path.join(__dirname, "./routes/**.route.ts"));
  console.log(routes);
  const opts = await new SwaggerLoader().handler(routes);
  await fs.writeFile(SwaggerBuilder.Instance().pathFile, JSON.stringify(opts));
})();
