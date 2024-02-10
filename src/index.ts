import Route from "./Route/Route";
import RouteConfig from "./Route/RouteConfig";
import MiddlewareData from "./RouteNormalization/MiddlewareData";
import RouteNormalization from "./RouteNormalization/RouteNormalization";
import SwaggerConfig from "./Swagger/Core/SwaggerConfig";


export default {
    Route: {Route, RouteConfig},
    Swagger: {SwaggerConfig},
    RouteNormalization : {RouteNormalization, MiddlewareData}
}