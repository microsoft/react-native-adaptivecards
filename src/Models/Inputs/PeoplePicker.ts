import { CardContext } from '../../Contexts/CardContext';
import { FormField } from '../../Contexts/FormStore';
import { AbstractModel } from '../Abstract/AbstractModel';
import { InputModel } from '../Abstract/InputModel';
import { CallbackActionModel } from '../Actions/CallbackAction';
import { CardModel } from '../Cards/Card';

export class PeoplePickerModel extends InputModel {
    private suggestionContext: CardContext;
    public suggestionCard: CardModel;
    public callback: CallbackActionModel;
    public selected: string;
    public onSuggestionReady: (card: CardModel) => void;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.callback = new CallbackActionModel(json.callback, this, this.context);
        this.placeholder = json.placeholder;

        if (this.context.form) {
            this.context.form.registerListener(this.id, this.storeListener );
            this.context.form.write({
                id: this.id,
                value: this.value || JSON.stringify([]),
                isValid: true
            });
        }

        this.suggestionContext = CardContext.createInstance(this.context);
        this.suggestionContext.registerSelectActionHandler(this.onSuggestionSelect);
    }

    public isValueValid = (value?: string) => true;

    public onInput = (value: string) => {
        if (value !== undefined) {
            this.input = value;
            if (this.callback) {
                this.callback.onAction(this.onCallbackResponse, undefined);
            }
        }
    }

    public onSuggestionSelect = (data: any) => {
        console.log('Select Action >>', data, '>>', this.context.form);
        if (this.context && this.context.form) {
            let field = this.context.form.read(this.id);
            if (field) {
                let currentValue = JSON.parse(field.value) as Array<any>;
                if (currentValue) {
                    if (data) {
                        currentValue.push(data);
                        this.context.form.write({
                            id: this.id,
                            value: JSON.stringify(currentValue),
                            isValid: true,
                        });
                        return Promise.resolve(data);
                    }
                }
            }
        }
        return Promise.resolve({});
    }

    public storeListener = (field: FormField) => {
        this.selected = field.value;
        if (field) {
            if (this.onStoreUpdate) {
                this.onStoreUpdate(this.selected);
            }
        }
    }

    private onCallbackResponse = (data: any) => {
        this.suggestionCard = new CardModel(data, this, this.suggestionContext);
        if (this.onSuggestionReady) {
            this.onSuggestionReady(this.suggestionCard);
        }
    }

    public get children() {
        if (this.callback) {
            return [this.callback];
        }
        return [];
    }
}
