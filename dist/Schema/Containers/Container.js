import { Utils } from '../../utils';
import { ContentElementType } from '../Base/ContentElement';
import { ContainerStyle } from '../Base/Enums';
import { FormElement } from '../Base/FormElement';
import { CardElementFactory } from '../Factories/ContentElementFactory';
export class ContainerElement extends FormElement {
    constructor(json) {
        super(json);
        this.items = [];
        if (this.isValidJSON) {
            this.items = CardElementFactory.createSet(json.items);
            this.style = Utils.getStringEnumValueOrDefault(ContainerStyle, json.style, ContainerStyle.Default);
        }
    }
    getTypeName() {
        return ContentElementType.Container;
    }
    getRequiredProperties() {
        return ['items'];
    }
    getChildren() {
        return this.items;
    }
    hasItems() {
        return this.items && this.items.length > 0;
    }
}
