import { ActionElement } from './Action';
import { ActionType } from './ActionType';
export class OpenUrlActionElement extends ActionElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.url = json.url;
        }
    }
    getTypeName() {
        return ActionType.OpenUrl;
    }
    getRequiredProperties() {
        return ['url'];
    }
    getAction() {
        return this;
    }
    getActions() {
        return [this.getAction()];
    }
}
