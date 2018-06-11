import { Utils } from '../../utils';
import { Spacing } from '../enums';
import { TypedElement } from '../TypedElement';

export abstract class CardElement extends TypedElement {
    // Optional
    readonly id?: string;
    readonly spacing?: Spacing;
    readonly separator?: boolean = false;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.id = json.id;
            this.spacing = Utils.getStringEnumValueOrDefault(Spacing, json.spacing, Spacing.Default) as Spacing;
            this.separator = json.separator || false;
        }
    }
}
