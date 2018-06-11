import { ActionElement } from './Action';
import { ActionType } from './ActionType';

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

    getAction(): ActionElement {
        return this;
    }

    getActions(): ActionElement[] {
        return [this.getAction()];
    }
}
