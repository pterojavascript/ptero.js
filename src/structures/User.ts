import { Handler } from "./Base";
import { UserDetails } from "./interfaces/IUser";
import Errors from '../error/Error'
import UserModel from './models/UserModel';

export default class User extends UserModel {

    constructor(handler: Handler, userDetails: UserDetails) {
        super(handler, userDetails);
    }

    enableTwoFactor(): Promise<Boolean> {
        // TODO: Do it
        return Promise.resolve(true);
    }

    updateEmail(newEmail: string, password: string): Promise<undefined> {
        return new Promise((resolve, reject) => {
            this.client?.requests.put("/account/email", {
                email: newEmail,
                password
            }).then(() => {
                resolve();
            })
        })
    }

    updatePassword(password: string, newPassword: string): Promise<undefined> {
        return new Promise((resolve, reject) => {
            this.client?.requests.put("/account/password", {
                "current_password": password,
                "password": newPassword,
                "password_confirmation": newPassword
            }).then(() => {
                resolve();
            })
        })
    }
    
}