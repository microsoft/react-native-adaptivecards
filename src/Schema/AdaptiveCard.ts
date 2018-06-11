import { ActionElement } from './Actions/Action';
import { ActionFactory } from './Actions/ActionFactory';
import { CardElement } from './Elements/CardElement';
import { CardElementFactory } from './Elements/CardElementFactory';
import { TypedElement } from './TypedElement';

export class AdaptiveCardElement extends TypedElement {
    // Required
    readonly version: string;
    // Optional
    readonly minVersion?: string;
    readonly fallbackText?: string;
    readonly backgroundImage?: string;
    readonly speak?: string;
    readonly actions?: Array<ActionElement> = [];
    readonly body?: Array<CardElement> = [];

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

    hasActions(): boolean {
        return this.actions && this.actions.length > 0;
    }

    hasBody(): boolean {
        return this.body && this.body.length > 0;
    }
}
