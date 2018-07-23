import { ActionElement } from '../Abstract/ActionElement';
import { IElement } from '../Interfaces/IElement';
import { IScope } from '../Interfaces/IScope';

export class OpenUrlActionElement extends ActionElement {
    // Required
    public readonly url: string;
    public readonly children: IElement[] = [];

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.url = json.url;
        }
    }

    public get scope(): IScope {
        return this.ancestorsAndSelf.find(element => element.parent === undefined) as IScope;
    }

    public get requiredProperties() {
        return ['type', 'title', 'url'];
    }
}
