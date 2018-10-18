import { InputType } from '../../../Shared/Types';
import { NumberUtils } from '../../../Utils/Number';
import { InputNode } from '../Abstract/InputNode';
import { ViewNode } from '../Abstract/ViewNode';
import { ChoiceNode } from './Choice';

export class ChoiceSetNode extends InputNode<Array<ChoiceNode>, number> {
    public readonly type = InputType.ChoiceSet;
    public readonly isMultiSelect: boolean;
    public readonly style: 'compact' | 'expanded';

    constructor(parent: ViewNode, payload: any) {
        super(parent, payload);

        this.isMultiSelect = payload.isMultiSelect;
        this.style = payload.style;

        if (payload.choices) {
            payload.choices.forEach((item: any, index: number) => {
                let choice = new ChoiceNode(this, item);
                if (choice) {
                    this.children.push(choice);
                }
            });
        }

        if (payload.value) {
            let selected = (payload.value as string).split(',');
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

    public stringify(): string {
        if (this.choices) {
            if (!this.isMultiSelect) {
                let choice = this.choices.find(current => current.selected);
                if (choice) {
                    return choice.value;
                }
            } else {
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

    public isValid(): boolean {
        return !!this.value;
    }

    protected handleInput(index: number) {
        if (NumberUtils.isInRange(index, 0, this.choices.length - 1)) {
            if (!this.isMultiSelect) {
                this.unSelectAll();
            }
            this.choices[index].selected = true;
        }
    }

    private unSelectAll() {
        if (this.choices) {
            this.choices.forEach((choice) => {
                choice.selected = false;
            });
        }
    }

    public get value() {
        return this.choices;
    }

    public get choices() {
        return this.children as ChoiceNode[];
    }
}
