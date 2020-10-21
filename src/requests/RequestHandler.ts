import { cloneDeepWith, reject } from "lodash";
import fetch from "node-fetch";
import { Response as FetchResponse } from "node-fetch";
import { Errors } from "..";

type RequestMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestResponse {
    status: number
}

export default class RequestHandler {

    private headers: { 
        "Authorization": string,
        "Accept": string,
        "Content-Type": string
    };

    constructor(private host: string, private apiKey: string, private baseEndpoint: string, private version: "v0.7" | "v1") {
        this.headers = {
            "Authorization": `Bearer ${this.apiKey}`,
            "Accept": this.version === "v1" ? "application/json" : "application/vnd.pterodactyl.v1+json",
            "Content-Type": "application/json"
        };
    }

    post(endpoint: string, body: Object) {
        return this._parseRequest(fetch(this._buildUrl(endpoint), this._buildData("POST", body)));
    }

    get(endpoint: string) {
        return this._parseRequest(fetch(this._buildUrl(endpoint), this._buildData("GET")));
    }

    put(endpoint: string, body: Object) {
        return this._parseRequest(fetch(this._buildUrl(endpoint), this._buildData("PUT", body)));
    }
    
    patch(endpoint: string, body: Object) {
        return this._parseRequest(fetch(this._buildUrl(endpoint), this._buildData("PATCH", body)));
    }

    delete(endpoint: string, body: Object) {
        return this._parseRequest(fetch(this._buildUrl(endpoint), this._buildData("DELETE", body)));
    }

    private _parseRequest(res: Promise<FetchResponse>): Promise<RequestResponse> {
        return new Promise(resolve => {
            let status: number;
            res.then(async res => {
                status = res.status;
                if(status < 200 || status >= 300) {
                    throw new Errors.GenericError(`Request failed: ${res.statusText}`);
                }
                
                return res.clone().json().then(json => {
                    json["status"] = status
                    return json;
                }).catch(() => {
                    return { status }
                })
            }).then(res => {
                resolve(res);
            }).catch(err => {
                throw new Errors.GenericError(`Request failed: ${err}`);
            })
        })
    }

    private _buildUrl(endpoint: string) {
        return new URL(`${this.baseEndpoint}${endpoint}`, this.host).href;
    }

    private _buildData(method: RequestMethods, body?: Object | JSON) {
        return {
            method,
            headers: this.headers,
            body: JSON.stringify(body)
        }
    }

}