export default class Server {

    constructor(private serverObject: ServerDetailsV1 | ServerDetailsVp7, private version: "v0.7" | "v1") {
        // version === "v1" ? this.parseStable(serverObject) : this.parseLegacy(serverObject);
    }

    private parseStable(serverObject: ServerDetailsV1) {
        
    }

    private parseLegacy(serverObject: ServerDetailsVp7) {

    }

}

interface ServerAllocations {
    id: number,
    ip: string,
    ip_alias: string | null,
    port: number,
    notes: string | null,
    is_default: boolean
}

interface ServerDetailsV1 {
    server_owner: boolean,
    identifier: string,
    uuid: string,
    name: string,
    node: string,
    sftp_details: {
        ip: string,
        port: number
    },
    description: string,
    limits: {
        memory: number,
        swap: number,
        disk: number,
        io: number,
        cpu: number
    },
    feature_limits: {
        databases: number,
        allocations: number,
        backups: number
    },
    is_suspended: boolean,
    is_installing: boolean,
    relationships: {
        allocations: {
            data: Array<ServerAllocations>
        }
    }
}

interface ServerDetailsVp7 {

}