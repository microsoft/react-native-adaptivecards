import { AbstractModel } from '../Abstract/AbstractModel';
export class FactModel extends AbstractModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.title = json.title;
        this.value = json.value;
    }
}
