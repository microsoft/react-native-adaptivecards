import { Utils } from '../../utils';
import { CardElementType } from '../Elements/CardElementType';
import { ChoiceSetStyle } from '../enums';
import { ChoiceInputElement } from './ChoiceInput';
import { InputElement } from './Input';

export class ChoiceInputSetElement extends InputElement {
    // Required 
    readonly choices: Array<ChoiceInputElement> = [];

    // Optional
    readonly isMultiSelect?: boolean;
    readonly style?: ChoiceSetStyle;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.isMultiSelect = json.isMultiSelect || false;
            this.style = Utils.getEnumValueOrDefault(ChoiceSetStyle, json.style, ChoiceSetStyle.Compact);
            this.choices = this.createChoiceSet(json.choices);
        }
    }

    getTypeName(): string {
        return CardElementType.InputChoiceSet;
    }
    getRequiredProperties(): Array<string> {
        return ['id', 'choices'];
    }

    // TODO: Try to use generic type.
    private createChoiceSet(json: any): Array<ChoiceInputElement> {
        let inputChoiceSet: Array<ChoiceInputElement> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let inputChoice: ChoiceInputElement = new ChoiceInputElement(item);
                if (inputChoice && inputChoice.isValidJSON) {
                    inputChoiceSet.push(inputChoice);
                }
            });
        }
        return inputChoiceSet;
    }
}
