import { AbstractModel } from '../Abstract/AbstractModel';
export class ChoiceInputModel extends AbstractModel {
    constructor(json, parent, context) {
        json.type = 'Input.Choice',
            super(json, parent, context);
        this.title = json.title;
        this.value = json.value;
    }
}
