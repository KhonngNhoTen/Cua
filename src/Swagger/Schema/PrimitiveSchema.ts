import Schema from "./Schema";

class PrimitiveSchema extends Schema {
   private name: string = ""; 

    genSwagger(): Object {
        return {
            type: this.type
        }
    }


  
}
export default PrimitiveSchema;