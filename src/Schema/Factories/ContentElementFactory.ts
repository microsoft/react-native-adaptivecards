import { AbstractElement } from '../Base/AbstractElement';
import { ContentElement, ContentElementType } from '../Base/ContentElement';
import { ImageElement } from '../CardElements/Image';
import { TextBlockElement } from '../CardElements/TextBlock';
import { ColumnElement } from '../Containers/Column';
import { ColumnSetElement } from '../Containers/ColumnSet';
import { ContainerElement } from '../Containers/Container';
import { FactSetElement } from '../Containers/FactSet';
import { ImageSetElement } from '../Containers/ImageSet';
import { DateInputElement } from '../Inputs/DateInput';
import { NumberInputElement } from '../Inputs/NumberInput';
import { TextInputElement } from '../Inputs/TextInput';
import { TimeInputElement } from '../Inputs/TimeInput';

export class ContentElementFactory {
    public static create(json: any, parent: AbstractElement): ContentElement {
        if (!json) {
            return null;
        }
        let cardElement: ContentElement;
        switch (json.type) {
            case ContentElementType.Image:
                cardElement = new ImageElement(json, parent);
                break;
            case ContentElementType.TextBlock:
                cardElement = new TextBlockElement(json, parent);
                break;
            case ContentElementType.Column:
                cardElement = new ColumnElement(json, parent);
                break;
            case ContentElementType.ColumnSet:
                cardElement = new ColumnSetElement(json, parent);
                break;
            case ContentElementType.Container:
                cardElement = new ContainerElement(json, parent);
                break;
            case ContentElementType.FactSet:
                cardElement = new FactSetElement(json, parent);
                break;
            case ContentElementType.ImageSet:
                cardElement = new ImageSetElement(json, parent);
                break;
            case ContentElementType.TextInput:
                cardElement = new TextInputElement(json, parent);
                break;
            case ContentElementType.DateInput:
                cardElement = new DateInputElement(json, parent);
                break;
            case ContentElementType.TimeInput:
                cardElement = new TimeInputElement(json, parent);
                break;
            case ContentElementType.NumberInput:
                cardElement = new NumberInputElement(json, parent);
                break;
            default:
                cardElement = null;
                break;
        }
        return cardElement;
    }

    public static createSet(json: any, parent: AbstractElement): Array<ContentElement> {
        let cardElementSet: Array<ContentElement> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let cardElement: ContentElement = ContentElementFactory.create(item, parent);
                if (cardElement && cardElement.isValid) {
                    cardElementSet.push(cardElement);
                }
            });
        }
        return cardElementSet;
    }
}
