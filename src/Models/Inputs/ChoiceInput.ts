import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ChoiceSetModel } from './ChoiceSet';

export class ChoiceInputModel extends AbstractModel {
    public title: string;
    public value: string;
    public parent: ChoiceSetModel;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.title = json.title;
        this.value = json.value;
        this.onSelect = this.onSelect.bind(this);
    }

    public onSelect = () => {
        if (this.parent) {
            this.parent.onInput(this.value);
        }
    }
}
