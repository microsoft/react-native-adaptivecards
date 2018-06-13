import { ActionElement } from '../Base/ActionElement';
import { ContentElement } from '../Base/ContentElement';
import { FormElement } from '../Base/FormElement';
import { ActionFactory } from '../Factories/ActionFactory';
import { CardElementFactory } from '../Factories/ContentElementFactory';

export class AdaptiveCardElement extends FormElement {
    // Required
    readonly version: string;
    // Optional
    readonly minVersion?: string;
    readonly fallbackText?: string;
    readonly backgroundImage?: string;
    readonly speak?: string;
    readonly actions?: Array<ActionElement> = [];
    readonly body?: Array<ContentElement> = [];

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.version = json.version;
            this.minVersion = json.minVersion;
            this.fallbackText = json.fallbackText;
            this.backgroundImage = json.backgroundImage;
            this.speak = json.speak;
            this.actions = ActionFactory.createSet(json.actions);
            this.body = CardElementFactory.createSet(json.body);
        }
    }

    getTypeName(): string {
        return 'AdaptiveCard';
    }
    getRequiredProperties(): Array<string> {
        return ['version'];
    }

    getChildren() {
        return this.body;
    }

    getActions() {
        return this.actions;
    }

    hasActions(): boolean {
        return this.actions && this.actions.length > 0;
    }

    hasBody(): boolean {
        return this.body && this.body.length > 0;
    }
}
