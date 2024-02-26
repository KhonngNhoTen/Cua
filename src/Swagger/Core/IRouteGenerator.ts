import { ISwaggerComponent } from "./ISwaggerComponent";

export interface IRouteGenerator {
  fromRoute(...data: any): ISwaggerComponent;
}
