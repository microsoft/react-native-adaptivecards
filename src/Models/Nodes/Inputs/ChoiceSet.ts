import { InputType } from '../../../Shared/Types';
import { InputNode } from '../Abstract/InputNode';
import { ViewNode } from '../Abstract/ViewNode';
import { ChoiceInputNode } from './ChoiceInput';

export class ChoiceSetNode extends InputNode {
    public readonly type = InputType.ChoiceSet;
    public readonly isMultiSelect: boolean;
    public readonly style: 'compact' | 'expanded';

    constructor(parent: ViewNode, json: any) {
        super(parent, json);

        this.isMultiSelect = json.isMultiSelect;
        this.style = json.style;

        if (json.choices) {
            json.choices.forEach((item: any) => {
                let choice = new ChoiceInputNode(this, item);
                if (choice) {
                    this.children.push(choice);
                }
            });
        }
    }

    public onInput(input: string) {
        if (input !== undefined) {
            if (this.isMultiSelect) {
                let selected = this.parseSelected();
                let index = selected.indexOf(input);
                if (index < 0) {
                    selected.push(input);
                } else {
                    selected.splice(index, 1);
                }
                this.value = this.composeSelected(selected);
            } else {
                this.value = input;
            }
        }
    }

    public composeSelected = (values: string[]) => {
        if (values) {
            return values.reduce((prev, current, index) => {
                return `${prev}${(index === 0 ? '' : ',')}${current}`;
            }, '');
        }
        return '';
    }

    public parseSelected = (): string[] => {
        if (this.value) {
            return this.value.split(',').filter(s => !!s);
        }
        return [];
    }

    public get isValid(): boolean {
        return !!this.value;
    }

    public get choices() {
        return this.children as ChoiceInputNode[];
    }
}
