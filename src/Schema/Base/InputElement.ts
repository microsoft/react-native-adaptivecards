import { ContentElement } from '../Base/ContentElement';

export abstract class InputElement extends ContentElement {
    // Required
    readonly id: string;
    // Optional
    readonly value?: string;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.id = json.id;
            this.value = json.value;
        }
    }

    public isInput() {
        return true;
    }

    public getAllInputFieldIds() {
        return [this.getId()];
    }
}
