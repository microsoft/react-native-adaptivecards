import { ContentElement } from '../Abstract/ContentElement';
import { ScopeElement } from '../Abstract/ScopeElement';
import { ContentElementFactory } from '../Factories/ContentElementFactory';
import { IElement } from '../Interfaces/IElement';

export class ContainerElement extends ScopeElement {
    // Required
    public readonly items: Array<ContentElement> = [];
    // Optional
    public readonly style?: 'default' | 'emphasis';
    public readonly verticalContentAlignment?: 'top' | 'center' | 'bottom';
    public readonly height?: 'auto' | 'stretch';

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.style = json.style;
            this.items = ContentElementFactory.createSet(json.items, this);
            this.height = json.height;
            this.verticalContentAlignment = json.verticalContentAlignment;
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
