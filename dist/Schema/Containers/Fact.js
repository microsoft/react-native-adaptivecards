import TypedElement from '../TypedElement';
export default class Fact extends TypedElement {
    constructor(json) {
        super(json);
        if (this.isValidJSON) {
            this.title = json.title;
            this.value = json.value;
        }
    }
    getTypeName() {
        return 'Fact';
    }
    getRequiredProperties() {
        return ['title', 'value'];
    }
}
