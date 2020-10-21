import { Handler } from "./Base";
import { UserDetails } from "./interfaces/IUser";
import UserModel from './models/UserModel';

export default class User extends UserModel {

    constructor(handler: Handler, userDetails: UserDetails) {
        super(handler, userDetails);
    }

    enableTwoFactor(): Promise<Boolean> {
        // TODO: Do it
        return Promise.resolve(true);
    }
    
}