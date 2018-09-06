import { ContentModel } from './ContentModel';
export class InputModel extends ContentModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.id = json.id;
        this.value = json.value;
        this.placeholder = json.placeholder;
    }
}
