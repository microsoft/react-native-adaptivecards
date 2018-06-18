import { AbstractElement } from '../Base/AbstractElement';
import { ActionElement, ActionType } from '../Base/ActionElement';

export class OpenUrlActionElement extends ActionElement {
    // Required
    public readonly url: string;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.url = json.url;
        }
    }

    public getTypeName(): string {
        return ActionType.OpenUrl;
    }

    public getActionType(): string {
        return ActionType.OpenUrl;
    }

    public getRequiredProperties(): Array<string> {
        return ['url'];
    }
}
