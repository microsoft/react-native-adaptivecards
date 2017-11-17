import { Spacing, } from '../enums';
import { getStringEnumValueOrDefault } from '../../utils';
import TypedElement from '../TypedElement';
export default class CardElement extends TypedElement {
    constructor(json) {
        super(json);
        this.separator = false;
        if (this.isValidJSON) {
            this.id = json.id;
            this.spacing = getStringEnumValueOrDefault(Spacing, json.spacing, Spacing.Default);
            this.separator = json.separator || false;
        }
    }
}
