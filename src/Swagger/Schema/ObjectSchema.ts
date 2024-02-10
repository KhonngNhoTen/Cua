import Schema from "./Schema";

class ObjectSchema extends Schema {
    protected properties: {[fieldName: string]: Schema} = {};

    genSwagger(): Object {
        throw new Error("Method not implemented.");
    }


    
}