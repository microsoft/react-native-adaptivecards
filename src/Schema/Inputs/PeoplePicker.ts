import { InputElement } from '../Abstract/InputElement';
import { IElement } from '../Interfaces/IElement';
import { IScope } from '../Interfaces/IScope';
import { CallbackAction } from '../Internal/CallbackAction';

export class PeoplePickerElement extends InputElement implements IScope {
    public readonly callback: CallbackAction;
    public readonly placeholder?: string;

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.callback = new CallbackAction(json.callback, this);
            this.placeholder = json.placeholder;
        }
    }

    public get action() {
        return this.callback;
    }

    public get inputFields() {
        return ['selected_people'];
    }

    public getBackgroundImageUrl(): string {
        return undefined;
    }

    public validate(input: string) {
        return true;
    }

    public validateScope() {
        return true;
    }

    public get requiredProperties() {
        return ['type'];
    }
}
