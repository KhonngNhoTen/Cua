import Schema from "../Schema/Schema";
import ISwaggerComponent from "./SwaggerComponent";

class Content implements ISwaggerComponent {
   protected contentType: string = "";
   protected schema?: Schema ;

    genSwagger(): Object {
        throw new Error("Method not implemented.");
    }
    
}

export default Content;