import { Spacing } from '../../Shared/Enums';
import { EnumUtils } from '../../Shared/Utils';
import { ElementStyleConfig } from '../../Styles/StyleManager';
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
    // Optional
    public readonly id?: string;
    public readonly spacing?: Spacing;
    public readonly separator?: boolean = false;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.id = json.id;
            this.spacing = EnumUtils.getStringEnumValueOrDefault(Spacing, json.spacing, Spacing.Default) as Spacing;
            this.separator = json.separator || false;
        }
    }

    public getId() {
        return this.id;
    }

    public getStyleConfig(): ElementStyleConfig {
        return {
            spacing: this.spacing
        };
    }

    public isContent() {
        return true;
    }
}
