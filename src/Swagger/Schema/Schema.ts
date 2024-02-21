import ISwaggerComponent from "../Components/SwaggerComponent";
abstract class Schema implements ISwaggerComponent {
    
    protected type: string = "";
    protected nullable: boolean = false;
    protected description: string  = "";
    protected name: string = "";
    abstract genSwagger(): Object;
}


export default Schema