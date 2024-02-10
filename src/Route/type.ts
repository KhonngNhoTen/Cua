import RouteNormalization from "../RouteNormalization/RouteNormalization";
import SwaggerConfig from "../Swagger/Core/SwaggerConfig";
import RouteLoader from "./RouteLoader";

export type RouteSchema = {
    code: string;
    url: string;
    method: string;
    middlewares: Promise<void>[];
    handler?: Promise<void>;
    request: Object;
    response: Object;
    childs: RouteSchema[];
}


export type RouteConfigSchema = {
    path: string;
    swaggerConfig: SwaggerConfig
    routeLoader?: RouteLoader,
    routeNormalization ?: RouteNormalization
}