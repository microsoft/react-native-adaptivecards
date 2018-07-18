import { ActionElement } from '../Base/ActionElement';
export class SubmitActionElement extends ActionElement {
    constructor(json, parent) {
        super(json, parent);
        this.children = [];
        if (this.isValid) {
            this.data = json.data;
        }
    }
    get scope() {
        return this.ancestorsAndSelf.find(element => element.parent === undefined);
    }
    getRequiredProperties() {
        return ['type', 'title'];
    }
}
