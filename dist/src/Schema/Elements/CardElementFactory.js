import { ColumnElement } from '../Containers/Column';
import { ColumnSetElement } from '../Containers/ColumnSet';
import { ContainerElement } from '../Containers/Container';
import { FactSetElement } from '../Containers/FactSet';
import { ImageSetElement } from '../Containers/ImageSet';
import { DateInputElement } from '../Inputs/DateInput';
import { TextInputElement } from '../Inputs/TextInput';
import { TimeInputElement } from '../Inputs/TimeInput';
import { CardElementType } from './CardElementType';
import { ImageElement } from './Image';
import { TextBlockElement } from './TextBlock';
export class CardElementFactory {
    static create(json) {
        if (!json) {
            return null;
        }
        let cardElement;
        switch (json.type) {
            case CardElementType.Image:
                cardElement = new ImageElement(json);
                break;
            case CardElementType.TextBlock:
                cardElement = new TextBlockElement(json);
                break;
            case CardElementType.Column:
                cardElement = new ColumnElement(json);
                break;
            case CardElementType.ColumnSet:
                cardElement = new ColumnSetElement(json);
                break;
            case CardElementType.Container:
                cardElement = new ContainerElement(json);
                break;
            case CardElementType.FactSet:
                cardElement = new FactSetElement(json);
                break;
            case CardElementType.ImageSet:
                cardElement = new ImageSetElement(json);
                break;
            case CardElementType.InputText:
                cardElement = new TextInputElement(json);
                break;
            case CardElementType.DateInput:
                cardElement = new DateInputElement(json);
                break;
            case CardElementType.TimeInput:
                cardElement = new TimeInputElement(json);
                break;
            default:
                cardElement = null;
                break;
        }
        return cardElement;
    }
    static createSet(json) {
        let cardElementSet = [];
        if (json && json.length > 0) {
            json.forEach((item) => {
                let cardElement = CardElementFactory.create(item);
                if (cardElement && cardElement.isValidJSON) {
                    cardElementSet.push(cardElement);
                }
            });
        }
        return cardElementSet;
    }
}
