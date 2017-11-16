import {
    ChoiceSetStyle,
} from '../enums';
import { getEnumValueOrDefault } from '../../utils';
import CardElementType from '../Elements/CardElementType';
import Input from './Input';
import InputChoice from './InputChoice';

export default class InputChoiceSet extends Input {
    // Required 
    readonly choices: Array<InputChoice> = [];

    // Optional
    readonly isMultiSelect?: boolean;
    readonly style?: ChoiceSetStyle;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.isMultiSelect = json.isMultiSelect || false;
            this.style = getEnumValueOrDefault(ChoiceSetStyle, json.style, ChoiceSetStyle.Compact);
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
    private createChoiceSet(json: any): Array<InputChoice> {
        let inputChoiceSet: Array<InputChoice> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let inputChoice: InputChoice = new InputChoice(item);
                if (inputChoice && inputChoice.isValidJSON) {
                    inputChoiceSet.push(inputChoice);
                }
            });
        }
        return inputChoiceSet;
    }
}
