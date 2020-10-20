import fetch from "node-fetch";

export default class RequestHandler {

    constructor(private host: string, private apiKey: string, private baseEndpoint: string, private version: "v0.7" | "v1") {}

    postRequest(endpoint: string, body: Object) {
        return fetch(new URL(`${this.baseEndpoint}/${endpoint}`, this.host).href, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": this.version === "v1" ? "application/json" : "application/vnd.pterodactyl.v1+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
    }

    getRequest(endpoint: string) {
        return fetch(new URL(`${this.baseEndpoint}/${endpoint}`, this.host).href, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Accept": this.version === "v1" ? "application/json" : "application/vnd.pterodactyl.v1+json",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    }

}