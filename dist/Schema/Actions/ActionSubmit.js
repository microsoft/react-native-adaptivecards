import Action from './Action';
import ActionType from './ActionType';
export default class ActionSubmit extends Action {
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
}
