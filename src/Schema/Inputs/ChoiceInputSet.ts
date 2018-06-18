import { ChoiceSetStyle } from '../../Shared/Enums';
import { Utils } from '../../Shared/Utils';
import { AbstractElement } from '../Base/AbstractElement';
import { ContentElementType } from '../Base/ContentElement';
import { InputElement } from '../Base/InputElement';
import { ChoiceInputElement } from './ChoiceInput';

export class ChoiceInputSetElement extends InputElement {
    // Required 
    public readonly choices: Array<ChoiceInputElement> = [];

    // Optional
    public readonly isMultiSelect?: boolean;
    public readonly style?: ChoiceSetStyle;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.isMultiSelect = json.isMultiSelect || false;
            this.style = Utils.getEnumValueOrDefault(ChoiceSetStyle, json.style, ChoiceSetStyle.Compact);
            this.choices = this.createChoiceSet(json.choices);
        }
    }

    public getTypeName(): string {
        return ContentElementType.ChoiceSetInput;
    }

    public getRequiredProperties(): Array<string> {
        return ['id', 'choices'];
    }

    // TODO: Try to use generic type.
    private createChoiceSet(json: any): Array<ChoiceInputElement> {
        let inputChoiceSet: Array<ChoiceInputElement> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let inputChoice: ChoiceInputElement = new ChoiceInputElement(item, this);
                if (inputChoice && inputChoice.isValidJSON) {
                    inputChoiceSet.push(inputChoice);
                }
            });
        }
        return inputChoiceSet;
    }
}
