import { type } from "os";
import RouteNormalization from "../RouteNormalization/RouteNormalization";
import SwaggerConfig from "../Swagger/Core/SwaggerBuilder";
import RouteLoader from "./RouteLoader";

export type RouteSchema = {
  code: string;
  url: string;
  method: string;
  middlewares: Promise<void>[];
  handler?: Promise<void>;
  request: Object;
  response: Record<string, RouteDataTransform>;
  parameters: RouteParameter;
  childs: RouteSchema[];
};

export type RouteConfigSchema = {
  path: string;
  swaggerConfig: SwaggerConfig;
  routeLoader?: RouteLoader;
  routeNormalization?: RouteNormalization;
};

export type RouteDataTransform = Record<string, any> | Record<string, Record<string, any>>;

export type RouteParameterAttributes = {
  description?: string;
  required?: boolean;
  example?: any;
};
export type LocationParameter = "query" | "header" | "path" | "cookie";
export type RouteParameter = {
  path: RouteDataTransform;
  query: RouteDataTransform;
  header: RouteDataTransform;
  cookie: RouteDataTransform;
};
