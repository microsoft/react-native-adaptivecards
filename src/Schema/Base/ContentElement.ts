import { AbstractElement } from './AbstractElement';

export enum ContentElementType {
    Column = 'Column',
    ColumnSet = 'ColumnSet',
    Container = 'Container',
    FactSet = 'FactSet',
    Image = 'Image',
    ImageSet = 'ImageSet',
    TextBlock = 'TextBlock',
    TextInput = 'Input.Text',
    NumberInput = 'Input.Number',
    DateInput = 'Input.Date',
    TimeInput = 'Input.Time',
    ToggleInput = 'Input.Toggle',
    ChoiceSetInput = 'Input.ChoiceSet',
    AdaptiveCard = 'AdaptiveCard',
}

export abstract class ContentElement extends AbstractElement {
    public readonly id?: string;
    public readonly spacing?: 'none' | 'default' | 'small' | 'medium' | 'large' | 'extraLarge' | 'padding';
    public readonly separator?: boolean = false;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValid) {
            this.id = json.id;
            this.spacing = json.spacing;
            this.separator = json.separator || false;
        }
    }
}
