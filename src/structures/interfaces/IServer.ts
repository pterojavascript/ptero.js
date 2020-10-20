export interface ServerAllocations {
    id: number,
    ip: string,
    ip_alias: string | null,
    port: number,
    notes: string | null,
    is_default: boolean
}

export interface ServerSFTPDetails {
    ip: string,
    port: number
}

export interface ServerLimits {
    memory: number,
    swap: number,
    disk: number,
    io: number,
    cpu: number
}

export interface ServerFeatureLimits {
    databases: number,
    allocations: number,
    backups: number
}

export interface ServerRelationships {
    allocations: Array<ServerAllocations>
}

export interface ServerDetails {
    server_owner: boolean,
    identifier: string,
    uuid: string,
    name: string,
    node: string,
    sftp_details: ServerSFTPDetails
    description: string,
    limits: ServerLimits,
    feature_limits: ServerFeatureLimits,
    is_suspended: boolean,
    is_installing: boolean,
    relationships: ServerRelationships
}