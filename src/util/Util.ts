export default class Util {

    static objectHasAll(obj: Object, ...props: string[]) {
        for(const prop of props) if(!obj.hasOwnProperty(prop)) return false;
        return true;
    }

    static objectHasSome(obj: Object, ...props: string[]) {
        for(const prop of props) if(obj.hasOwnProperty(prop)) return true;
        return false;
    }

}