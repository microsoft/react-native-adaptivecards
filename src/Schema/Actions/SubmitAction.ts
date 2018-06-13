import { ActionElement, ActionType } from '../Base/ActionElement';

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

    getData() {
        return this.data;
    }
}
