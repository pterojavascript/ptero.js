import { Errors } from "..";
export default class PteroJSError extends Error {

    constructor(message: string) {
        super(message);
    }

}