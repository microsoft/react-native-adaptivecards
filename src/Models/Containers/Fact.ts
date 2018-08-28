import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';

export class FactModel extends AbstractModel {
    public title: string;
    public value: string;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.title = json.title;
        this.value = json.value;
    }
}
