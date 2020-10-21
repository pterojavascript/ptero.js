import { Client } from '..';
import { Application } from '..';
import RequestHandler from '../requests/RequestHandler';

export default class Base {

    public client?: Client;
    public application?: Application;

    constructor(handler: Client | Application) {
        if(handler instanceof Client) this.client = handler;
        if(handler instanceof Application) this.application = handler;
    }

}

export type Handler = Client | Application;