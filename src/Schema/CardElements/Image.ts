import { Utils } from '../../utils';
import { ActionElement } from '../Base/ActionElement';
import { ContentElement, ContentElementType } from '../Base/ContentElement';
import {
    HorizontalAlignment,
    ImageSize,
    ImageStyle,
} from '../Base/Enums';
import { ActionFactory } from '../Factories/ActionFactory';

export class ImageElement extends ContentElement {
    // Required
    readonly url: string;
    // Optional
    readonly altText?: string;
    readonly horizontalAlignment?: HorizontalAlignment;
    readonly selectAction?: ActionElement;
    size?: ImageSize = ImageSize.Auto;
    readonly style?: ImageStyle;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.url = json.url;
            this.altText = json.altText;
            this.horizontalAlignment =
                Utils.getStringEnumValueOrDefault(HorizontalAlignment, json.horizontalAlignment, HorizontalAlignment.Left) as
                HorizontalAlignment;
            this.selectAction = ActionFactory.create(json.selectAction);
            this.size = Utils.getStringEnumValueOrDefault(ImageSize, json.size, ImageSize.Auto) as ImageSize;
            this.style = Utils.getStringEnumValueOrDefault(ImageStyle, json.style, ImageStyle.Default) as ImageStyle;
        }
    }

    getTypeName(): string {
        return ContentElementType.Image;
    }

    getRequiredProperties(): Array<string> {
        return ['url'];
    }

    supportAction() {
        return true;
    }

    getAction() {
        return this.selectAction;
    }

    getActions() {
        return [this.getAction()];
    }

    setSize(size: ImageSize): void {
        this.size = Utils.getStringEnumValueOrDefault(ImageSize, size, ImageSize.Auto) as ImageSize;
    }

    isFixedSize(): boolean {
        return this.size !== ImageSize.Auto && this.size !== ImageSize.Stretch;
    }
}
