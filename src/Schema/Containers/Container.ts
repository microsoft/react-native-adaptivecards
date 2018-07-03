import { ContainerStyle } from '../../Shared/Enums';
import { EnumUtils } from '../../Shared/Utils';
import { ElementStyleConfig } from '../../Styles/StyleManager';
import { AbstractElement } from '../Base/AbstractElement';
import { ContentElement, ContentElementType } from '../Base/ContentElement';
import { FormElement } from '../Base/FormElement';
import { CardElementFactory } from '../Factories/ContentElementFactory';

export class ContainerElement extends FormElement {
    // Required
    public readonly items: Array<ContentElement> = [];
    // Optional
    public readonly style?: ContainerStyle;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.items = CardElementFactory.createSet(json.items, this);
            this.style = EnumUtils.getStringEnumValueOrDefault(ContainerStyle, json.style, ContainerStyle.Default) as ContainerStyle;
        }
    }

    public getTypeName(): string {
        return ContentElementType.Container;
    }
    public getRequiredProperties(): Array<string> {
        return ['items'];
    }

    public getChildren() {
        return this.items;
    }

    public getStyleConfig(): ElementStyleConfig {
        return {
            spacing: this.spacing,
        };
    }

    public hasItems(): boolean {
        return this.items && this.items.length > 0;
    }
}
