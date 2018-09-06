import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';

export class ChoiceInputModel extends AbstractModel {
    public title: string;
    public value: string;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        json.type = 'Input.Choice',
        super(json, parent, context);

        this.title = json.title;
        this.value = json.value;
    }
}
