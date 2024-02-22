import ISwaggerComponent from "./SwaggerComponent";

class Response implements ISwaggerComponent {
  private httpStatus: string = "";
  private description: string = "";

  genSwagger(): Object {
    return {};
  }
}

export default Response;
