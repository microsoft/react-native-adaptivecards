import { ScopeElement } from '../Abstract/ScopeElement';
import { ActionFactory } from '../Factories/ActionFactory';
import { ContentElementFactory } from '../Factories/ContentElementFactory';
import { IAction } from '../Interfaces/IAction';
import { IContent } from '../Interfaces/IContent';
import { IElement } from '../Interfaces/IElement';

export class CardElement extends ScopeElement {
    // Required
    public readonly version: string;
    // Optional
    public readonly minVersion?: string;
    public readonly fallbackText?: string;
    public readonly speak?: string;
    public readonly actions?: IAction[];
    public readonly body?: IContent[];
    public readonly backgroundImage?: string;
    public readonly cardSource?: string;

    constructor(json: any, parent: IElement) {
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

    public get children() {
        let result: IElement[] = [];
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

    public get requiredProperties() {
        return ['type', 'version'];
    }
}
