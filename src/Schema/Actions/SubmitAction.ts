import { AbstractElement } from '../Base/AbstractElement';
import { ActionElement } from '../Base/ActionElement';
import { FormElement } from '../Base/FormElement';

export class SubmitActionElement extends ActionElement {
    // Optional
    public readonly data?: any;
    public readonly children: AbstractElement[] = [];

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValid) {
            this.data = json.data;
        }
    }

    public get scope(): FormElement {
        return this.ancestorsAndSelf.find(element => element.parent === undefined) as FormElement;
    }

    protected getRequiredProperties(): string[] {
        return ['type', 'title'];
    }
}
