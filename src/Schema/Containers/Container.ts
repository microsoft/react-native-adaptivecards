import { ContentElement } from '../Abstract/ContentElement';
import { ScopeElement } from '../Abstract/ScopeElement';
import { ContentElementFactory } from '../Factories/ContentElementFactory';
import { IElement } from '../Interfaces/IElement';

export class ContainerElement extends ScopeElement {
    // Required
    public readonly items: Array<ContentElement> = [];
    // Optional
    public readonly style?: 'default' | 'emphasis';

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.style = json.style;
            this.items = ContentElementFactory.createSet(json.items, this);
        }
    }

    public get children() {
        if (this.items) {
            return this.items;
        }
        return [];
    }

    public get requiredProperties() {
        return ['type', 'items'];
    }
}
