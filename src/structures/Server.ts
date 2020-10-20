import { Application, Client } from '..';
import Base from './Base';
import { ServerDetails, ServerSFTPDetails, ServerLimits, ServerFeatureLimits, ServerRelationships } from './interfaces/IServer';

type Handler = Client | Application;

export default class Server extends Base {

    public identifier: string;
    public uuid: string;
    public name: string;
    public nodeName: string;
    public sftpDetails: ServerSFTPDetails;
    public description: string;
    public limits: ServerLimits;
    public featureLimits: ServerFeatureLimits;
    public isSuspended: boolean;
    public isInstalling: boolean;
    public relationships: ServerRelationships

    constructor(handler: Handler, serverDetails: ServerDetails, version: "v0.7" | "v1") {
        super(handler);
        this.identifier = serverDetails.identifier;
        this.uuid = serverDetails.uuid;
        this.name = serverDetails.name;
        this.nodeName = serverDetails.node;
        this.sftpDetails = serverDetails.sftp_details;
        this.description = serverDetails.description;
        this.limits = serverDetails.limits;
        this.featureLimits = serverDetails.feature_limits;
        this.isSuspended = serverDetails.is_suspended;
        this.isInstalling = serverDetails.is_installing;
        this.relationships = serverDetails.relationships;
    }

}