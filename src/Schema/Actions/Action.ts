import { TypedElement } from '../TypedElement';

export abstract class ActionElement extends TypedElement {
    // Optional
    readonly title?: string;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.title = json.title;
        }
    }

    public supportAction() {
        return true;
    }
}
