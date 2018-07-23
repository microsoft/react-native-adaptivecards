import { ActionElement } from '../Abstract/ActionElement';
export class CallbackAction extends ActionElement {
    constructor(json, parent) {
        super(json, parent);
        this.children = [];
        if (this.isValid) {
            this.url = json.url;
            this.parameters = json.parameters;
        }
    }
    get scope() {
        if (this.parent) {
            return this.parent;
        }
        return undefined;
    }
    get requiredProperties() {
        return ['type', 'url'];
    }
}
