import ISwaggerComponent from "../Components/SwaggerComponent";

abstract class Schema implements ISwaggerComponent {
    abstract genSwagger(): Object;
    protected type: string = "";
    protected nullable: boolean = false;
    protected description: string  = "";

}


export default Schema