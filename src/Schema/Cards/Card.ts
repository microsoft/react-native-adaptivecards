import { AbstractElement } from '../Base/AbstractElement';
import { ActionElement } from '../Base/ActionElement';
import { ContentElement } from '../Base/ContentElement';
import { FormElement } from '../Base/FormElement';
import { ActionFactory } from '../Factories/ActionFactory';
import { ContentElementFactory } from '../Factories/ContentElementFactory';

export class CardElement extends FormElement {
    // Required
    public readonly version: string;
    // Optional
    public readonly minVersion?: string;
    public readonly fallbackText?: string;
    public readonly speak?: string;
    public readonly actions?: ActionElement[];
    public readonly body?: ContentElement[];
    public readonly backgroundImage?: string;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValid) {
            this.version = json.version;
            this.minVersion = json.minVersion;
            this.fallbackText = json.fallbackText;
            this.speak = json.speak;
            this.actions = ActionFactory.createSet(json.actions, this);
            this.body = ContentElementFactory.createSet(json.body, this);
            this.backgroundImage = json.backgroundImage;
        }
    }

    public get children(): AbstractElement[] {
        let result: AbstractElement[] = [];
        if (this.body) {
            result = result.concat(this.body);
        }
        if (this.actions) {
            result = result.concat(this.actions);
        }
        return result;
    }

    public getBackgroundImageUrl() {
        return this.backgroundImage;
    }

    protected getRequiredProperties(): Array<string> {
        return ['type', 'version'];
    }
}
