import TypedElement from '../TypedElement';
export default class Action extends TypedElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.title = json.title;
        }
    }
}
