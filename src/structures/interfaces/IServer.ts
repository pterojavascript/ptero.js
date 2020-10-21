export interface ServerAllocations {
    id: number,
    ip: string,
    ip_alias: string | null,
    port: number,
    notes: string | null,
    is_default: boolean
}

export interface ServerVariables {
    name: string,
    description: string,
    env_variable: string,
    default_value: string,
    server_value: string,
    is_editable: string,
    rules: string,
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
    allocations?: Array<ServerAllocations>,
    variables?: Array<ServerVariables>
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