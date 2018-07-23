import { ActionElement } from '../Abstract/ActionElement';
export class OpenUrlActionElement extends ActionElement {
    constructor(json, parent) {
        super(json, parent);
        this.children = [];
        if (this.isValid) {
            this.url = json.url;
        }
    }
    get scope() {
        return this.ancestorsAndSelf.find(element => element.parent === undefined);
    }
    get requiredProperties() {
        return ['type', 'title', 'url'];
    }
}
