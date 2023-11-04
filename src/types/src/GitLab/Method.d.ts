import PaginateParams = require("./PaginateParams");

export = Method;

declare interface MethodProperties {
    method: string;
    class: object;

    url(): Array<object> | object | string;

    url(id: string | number): object | string;

    url(obj: PaginateParams | object): Array<object>;

    url(id: string | number, body: object): any;
}

declare class Method {
    method: string;
    class: object;
    url: Function

    /**
     * @param {{method:string,class:object,url:Function}|MethodProperties} props
     */
    constructor(props: object | MethodProperties);
}

//# sourceMappingURL=Method.d.ts.map