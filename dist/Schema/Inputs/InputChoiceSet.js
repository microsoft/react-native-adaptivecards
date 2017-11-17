import { ChoiceSetStyle, } from '../enums';
import { getEnumValueOrDefault } from '../../utils';
import CardElementType from '../Elements/CardElementType';
import Input from './Input';
import InputChoice from './InputChoice';
export default class InputChoiceSet extends Input {
    constructor(json) {
        super(json);
        this.choices = [];
        if (this.isValidJSON) {
            this.isMultiSelect = json.isMultiSelect || false;
            this.style = getEnumValueOrDefault(ChoiceSetStyle, json.style, ChoiceSetStyle.Compact);
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
                let inputChoice = new InputChoice(item);
                if (inputChoice && inputChoice.isValidJSON) {
                    inputChoiceSet.push(inputChoice);
                }
            });
        }
        return inputChoiceSet;
    }
}
