import { CallbackActionSchema } from '../Schemas/Actions/CallbackAction';
import { OpenUrlActionSchema } from '../Schemas/Actions/OpenUrlAction';
import { SelectActionSchema } from '../Schemas/Actions/SelectAction';
import { ShowCardActionSchema } from '../Schemas/Actions/ShowCardAction';
import { SubmitActionSchema } from '../Schemas/Actions/SubmitAction';
import { BackgroundImageSchema } from '../Schemas/CardElements/BackgroundImage';
import { ImageSchema } from '../Schemas/CardElements/Image';
import { TextBlockSchema } from '../Schemas/CardElements/TextBlock';
import { CardSchema } from '../Schemas/Cards/AdaptiveCard';
import { ColumnSchema } from '../Schemas/Containers/Column';
import { ColumnSetSchema } from '../Schemas/Containers/ColumnSet';
import { ContainerSchema } from '../Schemas/Containers/Container';
import { FactSchema } from '../Schemas/Containers/Fact';
import { FactSetSchema } from '../Schemas/Containers/FactSet';
import { ImageSetSchema } from '../Schemas/Containers/ImageSet';
import { ChoiceInputSchema } from '../Schemas/Inputs/ChoiceInput';
import { ChoiceSetSchema } from '../Schemas/Inputs/ChoiceSet';
import { DateInputSchema } from '../Schemas/Inputs/DateInput';
import { NumberInputSchema } from '../Schemas/Inputs/NumberInput';
import { PeoplePickerSchema } from '../Schemas/Inputs/PeoplePicker';
import { TextInputSchema } from '../Schemas/Inputs/TextInput';
import { TimeInputSchema } from '../Schemas/Inputs/TimeInput';
import { ActionType, ContentType } from '../Shared/Types';
export class SchemaStore {
    constructor() {
        this.schemas = {};
        this.schemas[ActionType.OpenUrl] = new OpenUrlActionSchema();
        this.schemas[ActionType.Submit] = new SubmitActionSchema();
        this.schemas[ActionType.ShowCard] = new ShowCardActionSchema();
        this.schemas[ActionType.Callback] = new CallbackActionSchema();
        this.schemas[ActionType.Select] = new SelectActionSchema();
        this.schemas[ContentType.TextBlock] = new TextBlockSchema();
        this.schemas[ContentType.Image] = new ImageSchema();
        this.schemas['BackgroundImage'] = new BackgroundImageSchema();
        this.schemas[ContentType.AdaptiveCard] = new CardSchema();
        this.schemas[ContentType.Container] = new ContainerSchema();
        this.schemas[ContentType.ColumnSet] = new ColumnSetSchema();
        this.schemas[ContentType.Column] = new ColumnSchema();
        this.schemas[ContentType.FactSet] = new FactSetSchema();
        this.schemas['Fact'] = new FactSchema();
        this.schemas[ContentType.ImageSet] = new ImageSetSchema();
        this.schemas[ContentType.TextInput] = new TextInputSchema();
        this.schemas[ContentType.NumberInput] = new NumberInputSchema();
        this.schemas[ContentType.DateInput] = new DateInputSchema();
        this.schemas[ContentType.TimeInput] = new TimeInputSchema();
        this.schemas[ContentType.PeoplePicker] = new PeoplePickerSchema();
        this.schemas[ContentType.ChoiceSetInput] = new ChoiceSetSchema();
        this.schemas['Input.Choice'] = new ChoiceInputSchema();
    }
    static createInstance() {
        return new SchemaStore();
    }
    read(type) {
        return this.schemas[type];
    }
}
