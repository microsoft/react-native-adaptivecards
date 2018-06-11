import { Utils } from '../../utils';
import { Spacing } from '../enums';
import { TypedElement } from '../TypedElement';
export class CardElement extends TypedElement {
    constructor(json) {
        super(json);
        this.separator = false;
        if (this.isValidJSON) {
            this.id = json.id;
            this.spacing = Utils.getStringEnumValueOrDefault(Spacing, json.spacing, Spacing.Default);
            this.separator = json.separator || false;
        }
    }
}
