export interface GraphQLError {
    extensions: GraphQLErrorExtensions;
}

interface GraphQLErrorExtensions {
    exception: GraphQLErrorExtensionsException;
}

interface GraphQLErrorExtensionsException {
    /** Error message */
    message: string;
    /** Http Status code */
    status: number;
    /** Http Exception */
    name: string;
    /** Object thrown from the server */
    response: any;
}