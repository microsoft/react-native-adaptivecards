import { AbstractElement } from '../Base/AbstractElement';
import { ContentElement } from '../Base/ContentElement';
import { FormElement } from '../Base/FormElement';
import { ContentElementFactory } from '../Factories/ContentElementFactory';

export class ContainerElement extends FormElement {
    // Required
    public readonly items: Array<ContentElement> = [];
    // Optional
    public readonly style?: 'default' | 'emphasis';

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValid) {
            this.style = json.style;
            this.items = ContentElementFactory.createSet(json.items, this);
        }
    }

    public get children(): AbstractElement[] {
        if (this.items) {
            return this.items;
        }
        return [];
    }

    protected getRequiredProperties(): Array<string> {
        return ['type', 'items'];
    }
}
