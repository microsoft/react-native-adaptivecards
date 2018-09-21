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
import { CounterModel } from '../Customs/Microsoft.Counter';
import { ChoiceSetModel } from '../Inputs/ChoiceSet';
import { DateInputModel } from '../Inputs/DateInput';
import { NumberInputModel } from '../Inputs/NumberInput';
import { PeoplePickerModel } from '../Inputs/PeoplePicker';
import { TextInputModel } from '../Inputs/TextInput';
import { TimeInputModel } from '../Inputs/TimeInput';
import { ToggleInputModel } from '../Inputs/ToggleInput';

export class ContentModelFactory {
    public static create(json: any, parent: AbstractModel, context: CardContext): ContentModel {
        if (!json) {
            return undefined;
        }

        switch (json.type) {
            case ContentType.Image:
                return new ImageModel(json, parent, context);
            case ContentType.TextBlock:
                return new TextBlockModel(json, parent, context);
            case ContentType.Column:
                return new ColumnModel(json, parent, context);
            case ContentType.ColumnSet:
                return new ColumnSetModel(json, parent, context);
            case ContentType.Container:
                return new ContainerModel(json, parent, context);
            case ContentType.FactSet:
                return new FactSetModel(json, parent, context);
            case ContentType.ImageSet:
                return new ImageSetModel(json, parent, context);
            case ContentType.TextInput:
                return new TextInputModel(json, parent, context);
            case ContentType.DateInput:
                return new DateInputModel(json, parent, context);
            case ContentType.TimeInput:
                return new TimeInputModel(json, parent, context);
            case ContentType.NumberInput:
                return new NumberInputModel(json, parent, context);
            case ContentType.ChoiceSetInput:
                return new ChoiceSetModel(json, parent, context);
            case ContentType.ToggleInput:
                return new ToggleInputModel(json, parent, context);
            case ContentType.PeoplePicker:
                return new PeoplePickerModel(json, parent, context);
            case ContentType.Counter:
                return new CounterModel(json, parent, context);
            case ContentType.AdaptiveCard:
                return new CardModel(json, parent, CardContext.createInstance(context));
            default:
                return undefined;
        }
    }

    public static createSet(json: any, parent: AbstractModel, context: CardContext): Array<ContentModel> {
        let modelSet: Array<ContentModel> = [];
        if (json && json.length > 0) {
            json.forEach((item: any) => {
                let model: ContentModel = ContentModelFactory.create(item, parent, context);
                if (model) {
                    modelSet.push(model);
                }
            });
        }
        return modelSet;
    }
}
