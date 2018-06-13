import { ActionElement, ActionType } from '../Base/ActionElement';

export class OpenUrlActionElement extends ActionElement {
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
