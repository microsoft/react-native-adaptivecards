import { ContainerStyle } from '../../Shared/Enums';
import { Utils } from '../../Shared/Utils';
import { ContentElementType } from '../Base/ContentElement';
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
