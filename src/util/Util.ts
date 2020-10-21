import _, { last, StringIterator } from 'lodash';

export default class Util {

    static omitDeep<T>(obj: T, keys: Array<string>) {
        return _.cloneDeepWith(obj, (it) => { if(it && typeof it === "object") for(const key of keys) delete it[key] })
    }

    static cloneIntoRoot<T>(obj: T, keys: Array<string>) {
        let cloned: any = _.clone(obj);
        let lastParent: any = cloned;
        for(const [key, value] of Object.entries(obj)) {
            if(keys.includes(key)) Object.assign(lastParent, value)

            if(value && typeof value === "object") cloned[key] = this.cloneIntoRoot(value, keys);
            if(value && typeof Array.isArray(value)) {
                for(let i = 0; i < value.length; i++) {
                    const arrValue = value[i];
                    if(arrValue && typeof arrValue === "object") value[i] = this.cloneIntoRoot(arrValue, keys) 
                }

                if(Object.keys(lastParent).length <= 1) lastParent = value;
            }
        }

        return this.cloneArrayIntoRoot(this.omitDeep(cloned, ["attributes"]), ["data"]);
    }

    static cloneArrayIntoRoot<T>(obj: T, keys: Array<string>, root: any = true) {
        const cloned: any = _.clone(obj);
        const lastParent: any = cloned;
        for(const [key, value] of Object.entries(obj)) {
            if(value && !root && Array.isArray(value) && keys.includes(key) && Object.keys(lastParent).length <= 1) {
                return value;
            }

            if(value && typeof value === "object") cloned[key] = this.cloneArrayIntoRoot(value, keys, false)
        }

        return cloned;
    }

    static genericResponseParse<T>(requestResponse: T) {
        return Util.cloneIntoRoot(Util.omitDeep(requestResponse, ["object"]), ["attributes"]);
    }

    static objectHasAll(obj: Object, ...props: string[]) {
        for(const prop of props) if(!obj.hasOwnProperty(prop)) return false;
        return true;
    }

    static objectHasSome(obj: Object, ...props: string[]) {
        for(const prop of props) if(obj.hasOwnProperty(prop)) return true;
        return false;
    }

}