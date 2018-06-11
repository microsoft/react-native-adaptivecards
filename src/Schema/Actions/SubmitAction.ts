import { ActionElement } from './Action';
import { ActionType } from './ActionType';

export class SubmitActionElement extends ActionElement {
    // Optional
    readonly data?: any;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.data = json.data;
        }
    }

    getTypeName(): string {
        return ActionType.Submit;
    }

    getRequiredProperties(): Array<string> {
        return [];
    }

    getAction(): ActionElement {
        return this;
    }

    getActions(): ActionElement[] {
        return [this.getAction()];
    }
}
