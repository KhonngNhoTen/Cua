import { DataTransform } from "../Swagger/Component/DataTransform/DataTransform";

export abstract class BaseRouteDataTransform {
  abstract dataTransform(): DataTransform;
}
