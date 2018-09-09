import { AbstractModel } from '../Abstract/AbstractModel';
export class ChoiceInputModel extends AbstractModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.onSelect = () => {
            if (this.parent) {
                this.parent.onInput(this.value);
            }
        };
        this.title = json.title;
        this.value = json.value;
        this.onSelect = this.onSelect.bind(this);
    }
}
