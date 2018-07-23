import { IContent } from '../Interfaces/IContent';
import { IElement } from '../Interfaces/IElement';
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
    PeoplePicker = 'Input.PeoplePicker',
    AdaptiveCard = 'AdaptiveCard',
}

export abstract class ContentElement extends AbstractElement implements IContent {
    public readonly id?: string;
    public readonly spacing?: 'none' | 'default' | 'small' | 'medium' | 'large' | 'extraLarge' | 'padding';
    public readonly separator?: boolean;

    constructor(json: any, parent: IElement) {
        super(json, parent);

        if (this.isValid) {
            this.id = json.id;
            this.spacing = json.spacing;
            this.separator = json.separator || false;
        }
    }
}
