import {
    HorizontalAlignment,
    ImageSize,
    ImageStyle,
} from '../enums';
import {
    getStringEnumValueOrDefault
} from '../../utils';
import Action from '../Actions/Action';
import { createAction } from '../Actions/Creator';
import CardElement from './CardElement';
import CardElementType from './CardElementType';

export default class Image extends CardElement {
    // Required
    readonly url: string;
    // Optional
    readonly altText?: string;
    readonly horizontalAlignment?: HorizontalAlignment;
    readonly selectAction?: Action;
    size?: ImageSize = ImageSize.Auto;
    readonly style?: ImageStyle;

    constructor(json: any) {
        super(json);

        if (this.isValidJSON) {
            this.url = json.url;
            this.altText = json.altText;
            this.horizontalAlignment =
                getStringEnumValueOrDefault(HorizontalAlignment, json.horizontalAlignment, HorizontalAlignment.Left) as
                HorizontalAlignment;
            this.selectAction = createAction(json.selectAction);
            this.size = getStringEnumValueOrDefault(ImageSize, json.size, ImageSize.Auto) as ImageSize;
            this.style = getStringEnumValueOrDefault(ImageStyle, json.style, ImageStyle.Default) as ImageStyle;
        }
    }

    getTypeName(): string {
        return CardElementType.Image;
    }
    getRequiredProperties(): Array<string> {
        return ['url'];
    }

    setSize(size: ImageSize): void {
        this.size = getStringEnumValueOrDefault(ImageSize, size, ImageSize.Auto) as ImageSize;
    }

    isFixedSize(): boolean {
        return this.size !== ImageSize.Auto && this.size !== ImageSize.Stretch;
    }
}
