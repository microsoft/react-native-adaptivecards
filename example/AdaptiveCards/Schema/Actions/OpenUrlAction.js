import { ActionElement, ActionType } from '../Base/ActionElement';
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
}
