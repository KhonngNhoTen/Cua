import { BaseRouteDataTransform } from "./Route/BaseRouteDataTransform";
import { Route } from "./Route/Route";
import RouteLoader from "./Route/RouteLoader";
import { StreamData } from "./Route/StreamData";
import { SwaggerBuilder } from "./Swagger/Core/SwaggerBuilder";
import { SwaggerLoader } from "./Swagger/Core/SwaggerLoader";


export default {
  Route: { Route, StreamData, RouteLoader, BaseRouteDataTransform },
  Swagger: { SwaggerBuilder, SwaggerLoader },
};
