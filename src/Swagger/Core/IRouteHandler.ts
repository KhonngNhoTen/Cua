import ISwaggerComponent from "../Components/SwaggerComponent";

export interface IRouteHandler {
  fromRoute(...data: any): ISwaggerComponent;
}
