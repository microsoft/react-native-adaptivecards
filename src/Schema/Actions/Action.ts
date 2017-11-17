import TypedElement from '../TypedElement';

export default abstract class Action extends TypedElement {
    // Optional
    readonly title?: string;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.title = json.title;
        }
    }
}
