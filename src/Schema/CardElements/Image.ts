import {
    HorizontalAlignment,
    ImageSize,
    ImageStyle,
} from '../../Shared/Enums';
import { EnumUtils } from '../../Shared/Utils';
import { ElementStyleConfig } from '../../Styles/StyleManager';
import { AbstractElement } from '../Base/AbstractElement';
import { ContentElement, ContentElementType } from '../Base/ContentElement';
import { FormElement } from '../Base/FormElement';

export class ImageElement extends FormElement {
    // Required
    public readonly url: string;
    // Optional
    public readonly altText?: string;
    public readonly horizontalAlignment?: HorizontalAlignment;
    public size?: ImageSize = ImageSize.Auto;
    public readonly style?: ImageStyle;

    constructor(json: any, parent: AbstractElement) {
        super(json, parent);

        if (this.isValidJSON) {
            this.url = json.url;
            this.altText = json.altText;
            this.horizontalAlignment =
                EnumUtils.getStringEnumValueOrDefault(HorizontalAlignment, json.horizontalAlignment, HorizontalAlignment.Left) as
                HorizontalAlignment;
            this.size = EnumUtils.getStringEnumValueOrDefault(ImageSize, json.size, ImageSize.Auto) as ImageSize;
            this.style = EnumUtils.getStringEnumValueOrDefault(ImageStyle, json.style, ImageStyle.Default) as ImageStyle;
        }
    }

    public getTypeName(): string {
        return ContentElementType.Image;
    }

    public getRequiredProperties(): Array<string> {
        return ['url'];
    }

    public getAction() {
        return this.selectAction;
    }

    public getActions() {
        return [this.getAction()];
    }

    public getChildren(): ContentElement[] {
        return [];
    }

    public getStyleConfig(): ElementStyleConfig {
        return {
            horizontalAlignment: this.horizontalAlignment,
            imgSize: this.size,
            style: this.style,
            spacing: this.spacing,
        };
    }

    public setSize(size: ImageSize): void {
        this.size = EnumUtils.getStringEnumValueOrDefault(ImageSize, size, ImageSize.Auto) as ImageSize;
    }

    public isFixedSize(): boolean {
        return this.size !== ImageSize.Auto && this.size !== ImageSize.Stretch;
    }
}
