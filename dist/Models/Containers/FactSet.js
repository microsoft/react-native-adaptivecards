import { ContentModel } from '../Abstract/ContentModel';
import { FactModel } from './Fact';
export class FactSetModel extends ContentModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.facts = [];
        this.facts = [];
        if (json.facts) {
            json.facts.forEach((item) => {
                let fact = new FactModel(item, this, this.context);
                if (fact) {
                    this.facts.push(fact);
                }
            });
        }
    }
    get children() {
        return this.facts;
    }
}
