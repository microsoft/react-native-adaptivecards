import { Utils } from '../../utils';
import { CardElementType } from '../Elements/CardElementType';
import { ChoiceSetStyle } from '../enums';
import { ChoiceInputElement } from './ChoiceInput';
import { InputElement } from './Input';
export class ChoiceInputSetElement extends InputElement {
    constructor(json) {
        super(json);
        this.choices = [];
        if (this.isValidJSON) {
            this.isMultiSelect = json.isMultiSelect || false;
            this.style = Utils.getEnumValueOrDefault(ChoiceSetStyle, json.style, ChoiceSetStyle.Compact);
            this.choices = this.createChoiceSet(json.choices);
        }
    }
    getTypeName() {
        return CardElementType.InputChoiceSet;
    }
    getRequiredProperties() {
        return ['id', 'choices'];
    }
    createChoiceSet(json) {
        let inputChoiceSet = [];
        if (json && json.length > 0) {
            json.forEach((item) => {
                let inputChoice = new ChoiceInputElement(item);
                if (inputChoice && inputChoice.isValidJSON) {
                    inputChoiceSet.push(inputChoice);
                }
            });
        }
        return inputChoiceSet;
    }
}
