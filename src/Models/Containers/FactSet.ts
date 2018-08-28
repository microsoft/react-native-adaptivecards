import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ContentModel } from '../Abstract/ContentModel';
import { FactModel } from './Fact';

export class FactSetModel extends ContentModel {
    public facts: FactModel[] = [];

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.facts = [];
        if (json.facts) {
            json.facts.forEach((item: any) => {
                let fact = new FactModel(item, this, this.context);
                if (fact) {
                    this.facts.push(fact);
                }
            });
        }

    }

    public get children() {
        return this.facts;
    }
}
