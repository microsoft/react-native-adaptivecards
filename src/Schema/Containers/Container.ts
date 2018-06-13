import { ContainerStyle } from '../../Shared/Enums';
import { Utils } from '../../Shared/Utils';
import { ContentElement, ContentElementType } from '../Base/ContentElement';
import { FormElement } from '../Base/FormElement';
import { CardElementFactory } from '../Factories/ContentElementFactory';

export class ContainerElement extends FormElement {
    // Required
    readonly items: Array<ContentElement> = [];
    // Optional
    readonly style?: ContainerStyle;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.items = CardElementFactory.createSet(json.items);
            this.style = Utils.getStringEnumValueOrDefault(ContainerStyle, json.style, ContainerStyle.Default) as ContainerStyle;
        }
    }

    getTypeName(): string {
        return ContentElementType.Container;
    }
    getRequiredProperties(): Array<string> {
        return ['items'];
    }

    getChildren() {
        return this.items;
    }

    hasItems(): boolean {
        return this.items && this.items.length > 0;
    }
}
