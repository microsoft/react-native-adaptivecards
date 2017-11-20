import { HorizontalAlignment, ImageSize, ImageStyle, } from '../enums';
import { getStringEnumValueOrDefault } from '../../utils';
import { createAction } from '../Actions/Creator';
import CardElement from './CardElement';
import CardElementType from './CardElementType';
export default class Image extends CardElement {
    constructor(json) {
        super(json);
        this.size = ImageSize.Auto;
        if (this.isValidJSON) {
            this.url = json.url;
            this.altText = json.altText;
            this.horizontalAlignment =
                getStringEnumValueOrDefault(HorizontalAlignment, json.horizontalAlignment, HorizontalAlignment.Left);
            this.selectAction = createAction(json.selectAction);
            this.size = getStringEnumValueOrDefault(ImageSize, json.size, ImageSize.Auto);
            this.style = getStringEnumValueOrDefault(ImageStyle, json.style, ImageStyle.Default);
        }
    }
    getTypeName() {
        return CardElementType.Image;
    }
    getRequiredProperties() {
        return ['url'];
    }
    setSize(size) {
        this.size = getStringEnumValueOrDefault(ImageSize, size, ImageSize.Auto);
    }
    isFixedSize() {
        return this.size !== ImageSize.Auto && this.size !== ImageSize.Stretch;
    }
}
