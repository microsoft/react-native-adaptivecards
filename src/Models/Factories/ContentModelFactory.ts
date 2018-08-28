import { CardContext } from '../../Contexts/CardContext';
import { ContentType } from '../../Shared/Types';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ContentModel } from '../Abstract/ContentModel';
import { ImageModel } from '../CardElements/Image';
import { TextBlockModel } from '../CardElements/TextBlock';
import { CardModel } from '../Cards/Card';
import { ColumnModel } from '../Containers/Column';
import { ColumnSetModel } from '../Containers/ColumnSet';
import { ContainerModel } from '../Containers/Container';
import { FactSetModel } from '../Containers/FactSet';
import { ImageSetModel } from '../Containers/ImageSet';
import { DateInputModel } from '../Inputs/DateInput';
import { NumberInputModel } from '../Inputs/NumberInput';
import { PeoplePickerModel } from '../Inputs/PeoplePicker';
import { TextInputModel } from '../Inputs/TextInput';
import { TimeInputModel } from '../Inputs/TimeInput';

export class ContentModelFactory {
    public static create(json: any, parent: AbstractModel, context: CardContext): ContentModel {
        if (!json) {
            return null;
        }
        let cardElement: ContentModel;
        switch (json.type) {
            case ContentType.Image:
                cardElement = new ImageModel(json, parent, context);
                break;
            case ContentType.TextBlock:
                cardElement = new TextBlockModel(json, parent, context);
                break;
            case ContentType.Column:
                cardElement = new ColumnModel(json, parent, context);
                break;
            case ContentType.ColumnSet:
                cardElement = new ColumnSetModel(json, parent, context);
                break;
            case ContentType.Container:
                cardElement = new ContainerModel(json, parent, context);
                break;
            case ContentType.FactSet:
                cardElement = new FactSetModel(json, parent, context);
                break;
            case ContentType.ImageSet:
                cardElement = new ImageSetModel(json, parent, context);
                break;
            case ContentType.TextInput:
                cardElement = new TextInputModel(json, parent, context);
                break;
            case ContentType.DateInput:
                cardElement = new DateInputModel(json, parent, context);
                break;
            case ContentType.TimeInput:
                cardElement = new TimeInputModel(json, parent, context);
                break;
            case ContentType.NumberInput:
                cardElement = new NumberInputModel(json, parent, context);
                break;
            case ContentType.PeoplePicker:
                cardElement = new PeoplePickerModel(json, parent, context);
                break;
            case ContentType.AdaptiveCard:
                cardElement = new CardModel(json, parent, context);
                break;
            default:
                cardElement = null;
                break;
        }
        return cardElement;
    }

    public static createSet(json: any, parent: AbstractModel, context: CardContext): Array<ContentModel> {
        let cardElementSet: Array<ContentModel> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let cardElement: ContentModel = ContentModelFactory.create(item, parent, context);
                if (cardElement) {
                    cardElementSet.push(cardElement);
                }
            });
        }
        return cardElementSet;
    }
}
