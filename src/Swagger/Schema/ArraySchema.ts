import Schema from "./Schema";

class ArraySchema extends Schema {
    genSwagger(): Object {
        throw new Error("Method not implemented.");
    }
    protected items?: Schema ;
}


export default ArraySchema;