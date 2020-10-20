import RequestHandler from '../requests/RequestHandler';
import Error from '../error/Error';
import Util from '../util/Util';
import { Errors } from '..';

interface ClientOptions {
    host: string,
    apiKey: string,
    version?: "v0.7" | "v1"
}

export default class Client {

    private requestHandler: RequestHandler;
    private baseEndpoint: string = "/api/client";
    private host: string;
    private apiKey: string;
    private version: "v0.7" | "v1";

    constructor(options: ClientOptions) {
        if(!Util.objectHasAll(options, "host", "apiKey")) throw new Errors.GenericError("'host' and 'apiKey' fields are required");
        
        this.host = options.host;
        this.apiKey = options.apiKey;
        this.version = options.version || "v1";

        this.requestHandler = new RequestHandler(options.host, options.apiKey, this.baseEndpoint, this.version)
    }

    getServers() {
        return new Promise((resolve, reject) => {
            this.requestHandler.getRequest('').then(json => {
                resolve(json);
            });
        })
    }

}