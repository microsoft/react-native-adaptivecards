import { ElementUtils } from '../../Utils/ElementUtils';
import { ActionElement } from '../Abstract/ActionElement';
export class SelectActionElement extends ActionElement {
    constructor(json, parent) {
        super(json, parent);
        this.children = [];
        if (this.isValid) {
            this.title = json.selectedTextTitle;
            this.subTitle = json.selectedTextSubTitle;
            this.data = json.data;
        }
    }
    get targetFormField() {
        let targetInput = this.ancestorsAndSelf.find(element => ElementUtils.isSelectActionTarget(element.type));
        if (targetInput) {
            return targetInput.id;
        }
        return undefined;
    }
    get scope() {
        return this.ancestorsAndSelf.find(element => element.parent === undefined);
    }
    get requiredProperties() {
        return ['type', 'selectedTextTitle', 'selectedTextSubTitle', 'data'];
    }
}
