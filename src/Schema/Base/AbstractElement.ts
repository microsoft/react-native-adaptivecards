import { ConsoleUtils } from '../../Utils/ConsoleUtils';
import { JsonUtils } from '../../Utils/JsonUtils';

export enum CardElementType {
    Column = 'Column',
    ColumnSet = 'ColumnSet',
    Container = 'Container',
    Fact = 'Fact',
    FactSet = 'FactSet',
    Image = 'Image',
    ImageSet = 'ImageSet',
    TextBlock = 'TextBlock',
    TextInput = 'Input.Text',
    NumberInput = 'Input.Number',
    DateInput = 'Input.Date',
    TimeInput = 'Input.Time',
    ToggleInput = 'Input.Toggle',
    ChoiceInput = 'Input.Choice',
    ChoiceSetInput = 'Input.ChoiceSet',
    AdaptiveCard = 'AdaptiveCard',
}

export abstract class AbstractElement {
    public readonly parent: AbstractElement;
    public readonly isValid: boolean;
    public readonly type: string;

    constructor(json: any, parent: AbstractElement) {
        let validation = JsonUtils.isValidateJson(json, this.getRequiredProperties());
        if (!validation.isValid) {
            ConsoleUtils.error('AbstractElement', validation.message);
        } else {
            this.isValid = validation.isValid;
            this.type = json.type;
            this.parent = parent;
        }
    }

    public get ancestors(): AbstractElement[] {
        if (this.parent) {
            return [this.parent, ...this.parent.ancestors];
        }
        return [];
    }

    public get ancestorsAndSelf(): AbstractElement[] {
        return [this, ...this.ancestors];
    }

    public abstract get children(): AbstractElement[];

    public get descends(): AbstractElement[] {
        return this.children.reduce(
            (prev, current) => {
                return prev.concat(current.descends);
            },
            this.children.slice()
        );
    }

    public get descendsAndSelf(): AbstractElement[] {
        return [this, ...this.descends];
    }

    protected abstract getRequiredProperties(): string[];
}
