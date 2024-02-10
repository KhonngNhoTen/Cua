import Schema from "../Schema/Schema";
import ISwaggerComponent from "./SwaggerComponent";

class Parameter implements ISwaggerComponent {
    protected required: boolean = false;
    protected name: string = ""
    protected description: string = ""
    protected location: "query"|"path" = "path"
    protected schema?: Schema;

    genSwagger(): Object {
        throw new Error("Method not implemented.");
    }
    
}



export default Parameter;