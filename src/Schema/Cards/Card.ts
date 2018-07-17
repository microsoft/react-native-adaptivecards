import { AbstractElement } from '../Base/AbstractElement';
import { ActionElement } from '../Base/ActionElement';
import { ContentElement } from '../Base/ContentElement';
import { FormElement } from '../Base/FormElement';
import { ActionFactory } from '../Factories/ActionFactory';
import { CardElementFactory } from '../Factories/ContentElementFactory';

export class CardElement extends FormElement {
    // Required
    public readonly version: string;
    // Optional
    public readonly minVersion?: string;
    public readonly fallbackText?: string;
    public readonly speak?: string;
    public readonly actions?: Array<ActionElement> = [];
    public readonly body?: Array<ContentElement> = [];

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.version = json.version;
            this.minVersion = json.minVersion;
            this.fallbackText = json.fallbackText;
            this.speak = json.speak;
            this.actions = ActionFactory.createSet(json.actions, this);
            this.body = CardElementFactory.createSet(json.body, this);
        }
    }

    public getTypeName(): string {
        return 'AdaptiveCard';
    }
    public getRequiredProperties(): Array<string> {
        return ['version'];
    }

    public getChildren() {
        return this.body;
    }

    public getActions() {
        return this.actions;
    }

    public getAllInputFieldIds() {
        let children = this.getChildren().concat(this.getActions());
        return children.reduce(
            (prev, current) => {
                return prev.concat(current.getAllInputFieldIds());
            },
            []
        );
    }

    public getForm(): AbstractElement {
        let parent = this.getParent();
        if (parent) {
            return parent.getForm();
        }
        return super.getForm();
    }

    public hasActions(): boolean {
        return this.actions && this.actions.length > 0;
    }

    public hasBody(): boolean {
        return this.body && this.body.length > 0;
    }
}
