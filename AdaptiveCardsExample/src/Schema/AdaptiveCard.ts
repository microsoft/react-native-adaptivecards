import TypedElement from './TypedElement';
import Action from './Actions/Action';
import { createActionSet } from './Actions/Creator';
import CardElement from './Elements/CardElement';
import { createCardElementSet } from './Elements/Creator';

export default class AdaptiveCard extends TypedElement {
    // Required
    readonly version: string;
    // Optional
    readonly minVersion?: string;
    readonly fallbackText?: string;
    readonly backgroundImage?: string;
    readonly speak?: string;
    readonly actions?: Array<Action> = [];
    readonly body?: Array<CardElement> = [];

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.version = json.version;
            this.minVersion = json.minVersion;
            this.fallbackText = json.fallbackText;
            this.backgroundImage = json.backgroundImage;
            this.speak = json.speak;
            this.actions = createActionSet(json.actions);
            this.body = createCardElementSet(json.body);
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
