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

export class CardElementFactory {
    public static create(json: any): ContentElement {
        if (!json) {
            return null;
        }
        let cardElement: ContentElement;
        switch (json.type) {
            case ContentElementType.Image:
                cardElement = new ImageElement(json);
                break;
            case ContentElementType.TextBlock:
                cardElement = new TextBlockElement(json);
                break;
            case ContentElementType.Column:
                cardElement = new ColumnElement(json);
                break;
            case ContentElementType.ColumnSet:
                cardElement = new ColumnSetElement(json);
                break;
            case ContentElementType.Container:
                cardElement = new ContainerElement(json);
                break;
            case ContentElementType.FactSet:
                cardElement = new FactSetElement(json);
                break;
            case ContentElementType.ImageSet:
                cardElement = new ImageSetElement(json);
                break;
            case ContentElementType.InputText:
                cardElement = new TextInputElement(json);
                break;
            case ContentElementType.DateInput:
                cardElement = new DateInputElement(json);
                break;
            case ContentElementType.TimeInput:
                cardElement = new TimeInputElement(json);
                break;
            case ContentElementType.NumberInput:
                cardElement = new NumberInputElement(json);
                break;
            default:
                cardElement = null;
                break;
        }
        return cardElement;
    }

    public static createSet(json: any): Array<ContentElement> {
        let cardElementSet: Array<ContentElement> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let cardElement: ContentElement = CardElementFactory.create(item);
                if (cardElement && cardElement.isValidJSON) {
                    cardElementSet.push(cardElement);
                }
            });
        }
        return cardElementSet;
    }
}
