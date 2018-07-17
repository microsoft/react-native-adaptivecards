import { JsonUtils } from '../../Shared/Utils';
import { ElementStyleConfig } from '../../Styles/StyleManager';
import { ActionElement } from './ActionElement';

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
    private parent: AbstractElement;

    public backgroundImage: { url: string } | string;

    // Required
    public readonly type: string;

    public isValidJSON: boolean = true;

    constructor(json: any, parent: AbstractElement) {
        this.type = this.getTypeName();
        if (!this.type) {
            this.noTypeName();
        }
        this.parent = parent;
        this.backgroundImage = json.backgroundImage;
        this.validateJSON(json, this.getRequiredProperties());
    }

    public getParent() {
        return this.parent;
    }

    public abstract getTypeName(): string;

    public abstract getRequiredProperties(): Array<string>;

    public getAction(): ActionElement {
        return undefined;
    }

    public getActions(): ActionElement[] {
        return [];
    }

    public getForm(): AbstractElement {
        return undefined;
    }

    public abstract getStyleConfig(): ElementStyleConfig;

    public hasAction() {
        return false;
    }

    public isAction() {
        return false;
    }

    public isContent() {
        return false;
    }

    public isForm() {
        return false;
    }

    public isInput() {
        return false;
    }

    public isValue() {
        return false;
    }

    public validateForm(value?: any) {
        return true;
    }

    public getId(): string {
        return undefined;
    }

    public getAllInputFieldIds(): string[] {
        return [];
    }

    public isValid(): boolean {
        return this.isValidJSON;
    }

    public getBackgroundImageUrl() {
        console.log('getBackgroundImageUrl');
        console.log(this.backgroundImage);
        if (typeof this.backgroundImage === 'string') {
            return this.backgroundImage;
        } else {
            if (this.backgroundImage) {
                return this.backgroundImage.url;
            }
        }
        return undefined;
    }

    private noTypeName(): void {
        this.isValidJSON = false;
        console.error('Please return a valid type name in \'getTypeName()\' method.');
    }

    private noDataFound(): void {
        this.isValidJSON = false;
        console.error(this.getTypeName() + ': data not found');
    }

    private invalidRequiredProperty(property: string): void {
        this.isValidJSON = false;
        console.error(this.getTypeName() + ': ' + property + ' is required');
    }

    private validateJSON(json: any, requiredProperties: Array<string>): void {
        if (!json) {
            this.noDataFound();
        }

        if (requiredProperties) {
            for (let i = 0; i < requiredProperties.length; i++) {
                let property = requiredProperties[i];
                if (!JsonUtils.isValidValue(json[property])) {
                    this.invalidRequiredProperty(property);
                    return;
                }
            }
        }
    }
}
