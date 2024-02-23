import Route from "../src/Route/Route";
import { SwaggerBuilder } from "../src/Swagger/Core/SwaggerBuilder";
import { SwaggerLoader } from "../src/Swagger/Core/SwaggerLoader";

SwaggerBuilder.Instance().addServers(["youtube.com"]).addApiInfo("This's Title", "This's descriptions", "1.0.0");
const opts = new SwaggerLoader([
  new Route({
    code: "API1",
    url: "POST /path",
    request: { id: 0, name: "" },
    response: { id: 0, name: "" },
  }),
  new Route({
    code: "API1",
    url: "GET /path",
    parameters: { query: { id: 0, name: "" } },
    response: { id: 0, name: "" },
  }),
]);

opts.writeFile("./test.json");
