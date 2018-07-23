import { ActionElement } from '../Abstract/ActionElement';
import { ScopeElement } from '../Abstract/ScopeElement';
import { IElement } from '../Interfaces/IElement';

export class SubmitActionElement extends ActionElement {
    // Optional
    public readonly data?: any;
    public readonly children: IElement[] = [];

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.data = json.data;
        }
    }

    public get scope(): ScopeElement {
        return this.ancestorsAndSelf.find(element => element.parent === undefined) as ScopeElement;
    }

    public get requiredProperties() {
        return ['type', 'title'];
    }
}
