import { ScopeElement } from '../Abstract/ScopeElement';
import { ContentElementFactory } from '../Factories/ContentElementFactory';
export class ContainerElement extends ScopeElement {
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
    get requiredProperties() {
        return ['type', 'items'];
    }
}
