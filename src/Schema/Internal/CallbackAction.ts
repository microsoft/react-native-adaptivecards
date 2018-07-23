import { ActionElement } from '../Abstract/ActionElement';
import { ScopeElement } from '../Abstract/ScopeElement';
import { IAction } from '../Interfaces/IAction';
import { IElement } from '../Interfaces/IElement';

export class CallbackAction extends ActionElement implements IAction {
    public readonly url: string;
    public readonly parameters: { [key: string]: string; };
    public readonly children: IElement[] = [];

    constructor(json: any, parent: IElement) {
        super(json, parent);
        if (this.isValid) {
            this.url = json.url;
            this.parameters = json.parameters;
        }
    }

    public get scope() {
        if (this.parent) {
            return this.parent as ScopeElement;
        }
        return undefined;
    }

    public get requiredProperties() {
        return ['type', 'url'];
    }
}
