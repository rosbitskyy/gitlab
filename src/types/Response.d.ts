import {AbstractProperties} from "./AbstractProperties";

export interface Response extends AbstractProperties {
    constructor(props: Object): Response
}