import PaginateParams = require("./PaginateParams");

export = Method;

declare class Method {
    method: string;
    class: object;

    url(): Array<object> | object | string;

    url(id: string | number): object | string;

    url(obj: PaginateParams | object): Array<object>;

    url(id: string | number, body: object): any;

    /**
     * @param {{method:string,class:object,url:Function}|Method} props
     */
    constructor(props: object | Method);
}

//# sourceMappingURL=Method.d.ts.map