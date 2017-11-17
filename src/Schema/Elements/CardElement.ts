import {
    Spacing,
} from '../enums';
import { getStringEnumValueOrDefault } from '../../utils';
import TypedElement from '../TypedElement';

export default abstract class CardElement extends TypedElement {
    // Optional
    readonly id?: string;
    readonly spacing?: Spacing;
    readonly separator?: boolean = false;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.id = json.id;
            this.spacing = getStringEnumValueOrDefault(Spacing, json.spacing, Spacing.Default) as Spacing;
            this.separator = json.separator || false;
        }
    }
}
