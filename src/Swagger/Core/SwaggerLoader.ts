import Route from "../../Route/Route";
import { SwaggerSchema } from "../type";
import SwaggerBuilder from "./SwaggerBuilder";

class SwaggerLoader {
  private routes: Route[] = [];

  constructor(routes: Route[]) {
    this.routes = routes;
  }
  

  genSwagger(): SwaggerSchema {
    const schema = SwaggerBuilder.instance.Schema;
    return schema;
  }
}


export default SwaggerLoader;