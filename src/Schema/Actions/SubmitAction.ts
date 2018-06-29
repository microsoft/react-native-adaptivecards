import { AbstractElement } from '../Base/AbstractElement';
import { ActionElement, ActionType } from '../Base/ActionElement';

export class SubmitActionElement extends ActionElement {
    // Optional
    public readonly data?: any;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.data = json.data;
        }
    }

    public getTypeName(): string {
        return ActionType.Submit;
    }

    public getRequiredProperties(): Array<string> {
        return [];
    }

    public getActionType(): ActionType {
        return ActionType.Submit;
    }

    public getData() {
        return this.data;
    }
}
