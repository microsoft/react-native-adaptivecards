import { ContentElement, ContentElementType } from '../Abstract/ContentElement';
import { InputElementType } from '../Abstract/InputElement';
import { FormElementType } from '../Abstract/ScopeElement';
import { ImageElement } from '../CardElements/Image';
import { TextBlockElement } from '../CardElements/TextBlock';
import { CardElement } from '../Cards/Card';
import { ColumnElement } from '../Containers/Column';
import { ColumnSetElement } from '../Containers/ColumnSet';
import { ContainerElement } from '../Containers/Container';
import { FactSetElement } from '../Containers/FactSet';
import { ImageSetElement } from '../Containers/ImageSet';
import { DateInputElement } from '../Inputs/DateInput';
import { NumberInputElement } from '../Inputs/NumberInput';
import { PeoplePickerElement } from '../Inputs/PeoplePicker';
import { TextInputElement } from '../Inputs/TextInput';
import { TimeInputElement } from '../Inputs/TimeInput';
import { IElement } from '../Interfaces/IElement';

export class ContentElementFactory {
    public static create(json: any, parent: IElement): ContentElement {
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
            case FormElementType.Column:
                cardElement = new ColumnElement(json, parent);
                break;
            case FormElementType.ColumnSet:
                cardElement = new ColumnSetElement(json, parent);
                break;
            case FormElementType.Container:
                cardElement = new ContainerElement(json, parent);
                break;
            case ContentElementType.FactSet:
                cardElement = new FactSetElement(json, parent);
                break;
            case ContentElementType.ImageSet:
                cardElement = new ImageSetElement(json, parent);
                break;
            case InputElementType.TextInput:
                cardElement = new TextInputElement(json, parent);
                break;
            case InputElementType.DateInput:
                cardElement = new DateInputElement(json, parent);
                break;
            case InputElementType.TimeInput:
                cardElement = new TimeInputElement(json, parent);
                break;
            case InputElementType.NumberInput:
                cardElement = new NumberInputElement(json, parent);
                break;
            case InputElementType.PeoplePicker:
                cardElement = new PeoplePickerElement(json, parent);
                break;
            case ContentElementType.AdaptiveCard:
                cardElement = new CardElement(json, parent);
                break;
            default:
                cardElement = null;
                break;
        }
        return cardElement;
    }

    public static createSet(json: any, parent: IElement): Array<ContentElement> {
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
