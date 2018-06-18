import { ActionElement, ActionType } from '../Base/ActionElement';
export class OpenUrlActionElement extends ActionElement {
    constructor(json, parent) {
        super(json, parent);
        if (this.isValidJSON) {
            this.url = json.url;
        }
    }
    getTypeName() {
        return ActionType.OpenUrl;
    }
    getActionType() {
        return ActionType.OpenUrl;
    }
    getRequiredProperties() {
        return ['url'];
    }
}
