import { Utils } from '../../utils';
import { ContentElementType } from '../Base/ContentElement';
import { ChoiceSetStyle } from '../Base/Enums';
import { InputElement } from '../Base/InputElement';
import { ChoiceInputElement } from './ChoiceInput';
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
        return ContentElementType.InputChoiceSet;
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
