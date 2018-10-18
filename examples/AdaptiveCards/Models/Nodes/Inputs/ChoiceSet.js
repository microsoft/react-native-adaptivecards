import { InputType } from '../../../Shared/Types';
import { NumberUtils } from '../../../Utils/Number';
import { InputNode } from '../Abstract/InputNode';
import { ChoiceNode } from './Choice';
export class ChoiceSetNode extends InputNode {
    constructor(parent, payload) {
        super(parent, payload);
        this.type = InputType.ChoiceSet;
        this.isMultiSelect = payload.isMultiSelect;
        this.style = payload.style;
        if (payload.choices) {
            payload.choices.forEach((item, index) => {
                let choice = new ChoiceNode(this, item);
                if (choice) {
                    this.children.push(choice);
                }
            });
        }
        if (payload.value) {
            let selected = payload.value.split(',');
            if (selected) {
                selected.forEach(current => {
                    let choice = this.choices.find(c => c.value === current);
                    if (choice) {
                        choice.selected = true;
                    }
                });
            }
        }
    }
    stringify() {
        if (this.choices) {
            if (!this.isMultiSelect) {
                let choice = this.choices.find(current => current.selected);
                if (choice) {
                    return choice.value;
                }
            }
            else {
                return this.choices.reduce((prev, current) => {
                    if (current.selected) {
                        return `${prev}${(prev === '' ? '' : ',')}${current.value}`;
                    }
                    return prev;
                }, '');
            }
        }
        return '';
    }
    isValid() {
        return !!this.value;
    }
    handleInput(index) {
        if (NumberUtils.isInRange(index, 0, this.choices.length - 1)) {
            if (!this.isMultiSelect) {
                this.unSelectAll();
            }
            this.choices[index].selected = true;
        }
    }
    unSelectAll() {
        if (this.choices) {
            this.choices.forEach((choice) => {
                choice.selected = false;
            });
        }
    }
    get value() {
        return this.choices;
    }
    get choices() {
        return this.children;
    }
}
