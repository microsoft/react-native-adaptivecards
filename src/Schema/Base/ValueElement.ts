import { ElementStyleConfig } from '../../Styles/StyleManager';
import { AbstractElement } from './AbstractElement';

export enum ValueElementType {
    Fact = 'Fact',
    ChoiceInput = 'Input.Choice'
}

export abstract class ValueElement extends AbstractElement {
    // Optional
    public readonly title: string;
    public readonly value: string;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.title = json.title;
            this.value = json.value;
        }
    }

    public getRequiredProperties(): Array<string> {
        return ['title', 'value'];
    }

    public isValue() {
        return true;
    }

    public getStyleConfig(): ElementStyleConfig {
        return {};
    }
}
