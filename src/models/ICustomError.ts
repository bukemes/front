/* eslint-disable semi */
export default interface ICustomError {
    code: number; // HTTP status code
    type: string; // Error type
    message: string; // Error message
    fields?: Array<string>; // Optional field that caused the error
}