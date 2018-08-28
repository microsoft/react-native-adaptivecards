import { AbstractModel } from './AbstractModel';
export class ContentModel extends AbstractModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.id = json.id;
        this.spacing = json.spacing;
        this.separator = json.separator;
    }
}
