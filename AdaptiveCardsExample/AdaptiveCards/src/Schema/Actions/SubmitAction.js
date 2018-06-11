import { ActionElement } from './Action';
import { ActionType } from './ActionType';
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
    getAction() {
        return this;
    }
    getActions() {
        return [this.getAction()];
    }
}
