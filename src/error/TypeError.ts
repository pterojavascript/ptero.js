export default class PteroJSError extends TypeError {

    constructor(message: string) {
        super(message);
    }

    get name() {
        return `PteroJS ${super.name}`;
    }

}