import { Errors } from '..';
import { Handler } from './Base';
import { ServerDetails } from './interfaces/IServer';
import ServerModel from './models/ServerModel'

export default class Server extends ServerModel {

    constructor(handler: Handler, serverDetails: ServerDetails, version: "v0.7" | "v1") {
        super(handler, serverDetails);
    }

    setPower(signal: "start" | "stop" | "restart" | "kill") {
        const requestHandler = this.client?.requests || this.application?.requests;
        return new Promise((resolve, reject) => {
            requestHandler?.post(`/servers/${this.uuid}/power`, {
                signal
            }).then(res => {
                if(res.status !== 204) {
                    reject(new Errors.GenericError("API Error"))
                }

                console.log(res);
                resolve();
            })
        })
    }

    start() {
        return this.setPower("start");
    }

    stop() {
        return this.setPower("stop");
    }

    restart() {
        return this.setPower("restart");
    }

    kill() {
        return this.setPower("kill");
    }

}