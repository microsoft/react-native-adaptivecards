import { InputType } from '../../../Shared/Types';
import { InputNode } from '../Abstract/InputNode';
import { ChoiceInputNode } from './ChoiceInput';
export class ChoiceSetNode extends InputNode {
    constructor(parent, json) {
        super(parent, json);
        this.type = InputType.ChoiceSet;
        this.composeSelected = (values) => {
            if (values) {
                return values.reduce((prev, current, index) => {
                    return `${prev}${(index === 0 ? '' : ',')}${current}`;
                }, '');
            }
            return '';
        };
        this.parseSelected = () => {
            if (this.value) {
                return this.value.split(',').filter(s => !!s);
            }
            return [];
        };
        this.isMultiSelect = json.isMultiSelect;
        this.style = json.style;
        if (json.choices) {
            json.choices.forEach((item) => {
                let choice = new ChoiceInputNode(this, item);
                if (choice) {
                    this.children.push(choice);
                }
            });
        }
    }
    onInput(input) {
        if (input !== undefined) {
            if (this.isMultiSelect) {
                let selected = this.parseSelected();
                let index = selected.indexOf(input);
                if (index < 0) {
                    selected.push(input);
                }
                else {
                    selected.splice(index, 1);
                }
                this.value = this.composeSelected(selected);
            }
            else {
                this.value = input;
            }
        }
    }
    get isValid() {
        return !!this.value;
    }
    get choices() {
        return this.children;
    }
}
