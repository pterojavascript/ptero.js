import { Client } from '..';
import { Application } from '..';

export default class Base {

    public client?: Client = undefined;
    public application?: Application = undefined;

    constructor(handler: Client | Application) {
        if(handler instanceof Client) this.client = handler;
        if(handler instanceof Application) this.application = handler;
    }

}