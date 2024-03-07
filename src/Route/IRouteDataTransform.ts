import { DataTransform } from "../Plugins/Swagger/Component/DataTransform/DataTransform";

export interface IRouteDataTransform {
  dataTransform(): DataTransform;
}

export function isBaseRouteDataTransform(object: any): object is IRouteDataTransform {
  return (object as IRouteDataTransform).dataTransform !== undefined;
}
