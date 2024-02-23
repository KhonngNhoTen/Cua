import RouteNormalization from "../RouteNormalization/RouteNormalization";
import { SwaggerBuilder } from "../Swagger/Core/SwaggerBuilder";
import RouteLoader from "./RouteLoader";
import { RouteConfigSchema } from "./type";

class RouteConfig {
  private path: string = "";
  private routeLoader: RouteLoader;
  private swaggerConfig: SwaggerBuilder;
  private routeNormalization: RouteNormalization;

  constructor(schema: RouteConfigSchema) {
    this.path = schema.path;
    this.swaggerConfig = schema.swaggerConfig;
    this.routeLoader = schema.routeLoader ?? new RouteLoader();
    this.routeNormalization = schema.routeNormalization ?? new RouteNormalization();
  }
}

export default RouteConfig;
