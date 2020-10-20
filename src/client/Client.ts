import RequestHandler from '../requests/RequestHandler';
import Error from '../error/Error';
import Util from '../util/Util';
import Server from '../structures/Server';
import User from '../structures/User';

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
        if(!Util.objectHasAll(options, "host", "apiKey")) throw new Error.GenericError("'host' and 'apiKey' fields are required");
        
        this.host = options.host;
        this.apiKey = options.apiKey;
        this.version = options.version || "v1";

        this.requestHandler = new RequestHandler(this.host, this.apiKey, this.baseEndpoint, this.version)
    }

    getUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            this.requestHandler.getRequest("/account").then(json => {
                const parsed = Util.genericResponseParse(json);
                if(!parsed.id) reject(new Error.GenericError("API Error"))

                resolve(new User(this, parsed));
            })
        })
    }

    getServers(): Promise<Array<Server>> {
        return new Promise((resolve, reject) => {
            this.requestHandler.getRequest("/").then(json => {
                const servers: Array<Server> = [];

                const parsed = Util.genericResponseParse(json);
                if(!parsed.data) reject(new Error.GenericError("API Error"));

                for(const server of parsed.data) {
                    servers.push(new Server(this, server, this.version));
                }

                resolve(servers);
            });
        })
    }

}