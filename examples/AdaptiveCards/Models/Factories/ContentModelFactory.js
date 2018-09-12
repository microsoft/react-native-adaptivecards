import { CardContext } from '../../Contexts/CardContext';
import { ContentType } from '../../Shared/Types';
import { ImageModel } from '../CardElements/Image';
import { TextBlockModel } from '../CardElements/TextBlock';
import { CardModel } from '../Cards/Card';
import { ColumnModel } from '../Containers/Column';
import { ColumnSetModel } from '../Containers/ColumnSet';
import { ContainerModel } from '../Containers/Container';
import { FactSetModel } from '../Containers/FactSet';
import { ImageSetModel } from '../Containers/ImageSet';
import { ChoiceSetModel } from '../Inputs/ChoiceSet';
import { DateInputModel } from '../Inputs/DateInput';
import { NumberInputModel } from '../Inputs/NumberInput';
import { PeoplePickerModel } from '../Inputs/PeoplePicker';
import { TextInputModel } from '../Inputs/TextInput';
import { TimeInputModel } from '../Inputs/TimeInput';
import { ToggleInputModel } from '../Inputs/ToggleInput';
export class ContentModelFactory {
    static create(json, parent, context) {
        if (!json) {
            return null;
        }
        let model;
        switch (json.type) {
            case ContentType.Image:
                model = new ImageModel(json, parent, context);
                break;
            case ContentType.TextBlock:
                model = new TextBlockModel(json, parent, context);
                break;
            case ContentType.Column:
                model = new ColumnModel(json, parent, context);
                break;
            case ContentType.ColumnSet:
                model = new ColumnSetModel(json, parent, context);
                break;
            case ContentType.Container:
                model = new ContainerModel(json, parent, context);
                break;
            case ContentType.FactSet:
                model = new FactSetModel(json, parent, context);
                break;
            case ContentType.ImageSet:
                model = new ImageSetModel(json, parent, context);
                break;
            case ContentType.TextInput:
                model = new TextInputModel(json, parent, context);
                break;
            case ContentType.DateInput:
                model = new DateInputModel(json, parent, context);
                break;
            case ContentType.TimeInput:
                model = new TimeInputModel(json, parent, context);
                break;
            case ContentType.NumberInput:
                model = new NumberInputModel(json, parent, context);
                break;
            case ContentType.ChoiceSetInput:
                model = new ChoiceSetModel(json, parent, context);
                break;
            case ContentType.ToggleInput:
                model = new ToggleInputModel(json, parent, context);
                break;
            case ContentType.PeoplePicker:
                model = new PeoplePickerModel(json, parent, context);
                break;
            case ContentType.AdaptiveCard:
                model = new CardModel(json, parent, CardContext.createInstance(context));
                break;
            default:
                model = null;
                break;
        }
        return model;
    }
    static createSet(json, parent, context) {
        let modelSet = [];
        if (json && json.length > 0) {
            json.forEach((item) => {
                let model = ContentModelFactory.create(item, parent, context);
                if (model) {
                    modelSet.push(model);
                }
            });
        }
        return modelSet;
    }
}
