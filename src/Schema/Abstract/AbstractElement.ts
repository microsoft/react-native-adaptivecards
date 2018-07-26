import { ConsoleUtils } from '../../Utils/ConsoleUtils';
import { JsonUtils } from '../../Utils/JsonUtils';
import { IElement } from '../Interfaces/IElement';

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

export abstract class AbstractElement implements IElement {
    public readonly parent: IElement;
    public readonly isValid: boolean;
    public readonly type: string;

    constructor(json: any, parent: IElement) {
        let validation = JsonUtils.isValidateJson(json, this.requiredProperties);
        if (!validation.isValid) {
            ConsoleUtils.warning('AbstractElement', validation.message);
        } else {
            this.isValid = validation.isValid;
            this.type = json.type;
            this.parent = parent;
        }
    }

    public get ancestors(): IElement[] {
        if (this.parent) {
            return [this.parent, ...this.parent.ancestors];
        }
        return [];
    }

    public get ancestorsAndSelf(): IElement[] {
        return [this, ...this.ancestors];
    }

    public abstract get children(): IElement[];

    public get descends(): IElement[] {
        return this.children.reduce(
            (prev, current) => {
                return prev.concat(current.descends);
            },
            this.children.slice()
        );
    }

    public get descendsAndSelf(): IElement[] {
        return [this, ...this.descends];
    }

    public get requiredProperties(): string[] {
        return ['type'];
    }
}
