import Action from './Action';
import ActionType from './ActionType';

export default class ActionSubmit extends Action {
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
}
