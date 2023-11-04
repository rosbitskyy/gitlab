

export = Method;

declare class Method {
    method: string;
    class: object;

    url(id?: string | number): string;
    /**
     * @param {{method:string,class:object,url:Function}|Method} props
     */
    constructor(props: object | Method);
}

//# sourceMappingURL=Method.d.ts.map