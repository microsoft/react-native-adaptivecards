import { ActionElement, ActionType } from '../Base/ActionElement';
export class SubmitActionElement extends ActionElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.data = json.data;
        }
    }
    getTypeName() {
        return ActionType.Submit;
    }
    getRequiredProperties() {
        return [];
    }
    getData() {
        return this.data;
    }
}
