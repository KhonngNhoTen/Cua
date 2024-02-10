import Content from "./Content";
import ISwaggerComponent from "./SwaggerComponent";

class Response implements ISwaggerComponent {
    private httpStatus: string = "";
    private description: string = "";
    private content: Content[] = [];

    genSwagger(): Object {
        throw new Error("Method not implemented.");
    }
    
}



export default Response;