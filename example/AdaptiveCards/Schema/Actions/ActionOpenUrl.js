import Action from './Action';
import ActionType from './ActionType';
export default class ActionOpenUrl extends Action {
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
