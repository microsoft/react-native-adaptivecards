import Action from './Action';
import ActionType from './ActionType';

export default class ActionOpenUrl extends Action {
    // Required
    readonly url: string;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.url = json.url;
        }
    }

    getTypeName(): string {
        return ActionType.OpenUrl;
    }
    getRequiredProperties(): Array<string> {
        return ['url'];
    }
}
