import { ActionElement, ActionType } from '../Base/ActionElement';
export class SubmitActionElement extends ActionElement {
    constructor(json, parent) {
        super(json, parent);
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
    getActionType() {
        return ActionType.Submit;
    }
    getData() {
        return this.data;
    }
}
