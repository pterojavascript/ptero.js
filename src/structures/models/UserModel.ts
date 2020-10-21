import RequestHandler from '../../requests/RequestHandler';
import Base, { Handler } from "../Base";
import { UserDetails } from "../interfaces/IUser";

export default class User extends Base {

    public id: number;
    public isAdmin: boolean;
    public username: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public language: string;

    constructor(handler: Handler, userDetails: UserDetails) {
        super(handler);
        this.id = userDetails.id;
        this.isAdmin = userDetails.admin;
        this.username = userDetails.username;
        this.email = userDetails.email;
        this.firstName = userDetails.first_name;
        this.lastName = userDetails.last_name;
        this.language = userDetails.language;
    }
    
}