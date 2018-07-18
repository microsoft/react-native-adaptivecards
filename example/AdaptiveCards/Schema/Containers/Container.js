import { FormElement } from '../Base/FormElement';
import { ContentElementFactory } from '../Factories/ContentElementFactory';
export class ContainerElement extends FormElement {
    constructor(json, parent) {
        super(json, parent);
        this.items = [];
        if (this.isValid) {
            this.style = json.style;
            this.items = ContentElementFactory.createSet(json.items, this);
        }
    }
    get children() {
        if (this.items) {
            return this.items;
        }
        return [];
    }
    getRequiredProperties() {
        return ['type', 'items'];
    }
}
