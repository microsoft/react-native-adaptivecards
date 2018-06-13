import { Spacing } from '../../Shared/Enums';
import { Utils } from '../../Shared/Utils';
import { CardElement } from '../Base/CardElement';

export enum ContentElementType {
    Column = 'Column',
    ColumnSet = 'ColumnSet',
    Container = 'Container',
    FactSet = 'FactSet',
    Image = 'Image',
    ImageSet = 'ImageSet',
    TextBlock = 'TextBlock',
    InputText = 'Input.Text',
    NumberInput = 'Input.Number',
    DateInput = 'Input.Date',
    TimeInput = 'Input.Time',
    InputToggle = 'Input.Toggle',
    InputChoiceSet = 'Input.ChoiceSet',
}

export abstract class ContentElement extends CardElement {
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

    getId() {
        return this.id;
    }
}
