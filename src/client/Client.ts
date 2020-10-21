import { EventEmitter } from 'events'
import RequestHandler from '../requests/RequestHandler';
import Error from '../error/Error';
import Util from '../util/Util';
import Server from '../structures/Server';
import User from '../structures/User';
import Permission from '../structures/interfaces/Permission';

interface ClientOptions {
    host: string,
    apiKey: string,
    version?: "v0.7" | "v1"
    autoLogin: boolean;
}

export default class Client extends EventEmitter {

    public requests: RequestHandler;
    public host: string;
    public apiKey: string;
    public version: "v0.7" | "v1";
    public autoLogin: boolean;
    public user?: User;

    private baseEndpoint: string = "/api/client";

    constructor(options: ClientOptions) {
        super();
        if(!Util.objectHasAll(options, "host", "apiKey")) throw new Error.GenericError("'host' and 'apiKey' fields are required");
        
        this.host = options.host;
        this.apiKey = options.apiKey;
        this.version = options.version || "v1";
        this.autoLogin = options.autoLogin !== undefined && typeof options.autoLogin === "boolean" ? options.autoLogin : true;
        

        this.requests = new RequestHandler(this.host, this.apiKey, this.baseEndpoint, this.version)

        if(this.autoLogin) {
            this.login().then(() => {
                this.emit("ready");
            }).catch(err => {
                throw err
            })
        }
    }

    on(event: "ready" | "login" | "rateLimit", listener: (...args: any[]) => void): this {
        return super.on(event, listener);
    };

    private getUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            this.requests.get("/account").then(json => {
                const parsed = Util.genericResponseParse(json);
                if(!parsed.id) reject(new Error.GenericError("API Error"))

                resolve(new User(this, parsed));
            })
        })
    }

    login(): Promise<Client> {
        return this.getUser().then(user => {
            this.user = user;
            this.emit("login");
            return this;
        })
    }

    getServers(): Promise<Array<Server>> {
        return new Promise((resolve, reject) => {
            this.requests.get("/").then(json => {
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

    getPermissions(): Promise<Map<String, Permission>> {
        return new Promise((resolve, reject) => {
            this.requests.get("/permissions").then(json => {
                const permissions: Map<string, Permission> = new Map();

                const parsed = Util.genericResponseParse(json);
                if(!parsed.permissions) reject(new Error.GenericError("API Error"));
                
                for(const [key, value] of Object.entries(parsed.permissions)) {
                    permissions.set(key, value as Permission);
                }

                resolve(permissions);
            })
        })
    }

}