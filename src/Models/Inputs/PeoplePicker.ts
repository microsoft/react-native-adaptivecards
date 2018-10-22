import { CardContext } from '../../Contexts/CardContext';
import { FormField } from '../../Contexts/FormStore';
import { EmailUtils } from '../../Utils/EmailUtils';
import { StringUtils } from '../../Utils/StringUtils';
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
    public onSelect: () => void;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.callback = new CallbackActionModel(json.callback, this, this.context);
        this.placeholder = json.placeholder;

        this.selected = this.value || JSON.stringify([]);

        if (this.context.form) {
            this.context.form.registerListener(this.id, this.storeListener);
            this.context.form.write({
                id: this.id,
                value: this.selected,
                isValid: true
            });
        }

        this.suggestionContext = CardContext.createInstance(this.context);
        this.suggestionContext.registerSelectActionHandler(this.onSuggestionSelect);
    }

    public isValueValid = (value?: string) => {
        let field = this.context.form.read(this.id);
        if (field) {
            let currentValue = JSON.parse(field.value) as Array<any>;
            if (currentValue) {
                return currentValue.length !== 0;
            }
        }
        return false;
    }

    public onInput = (value: string) => {
        if (value !== undefined) {
            this.input = value;
            let contact: any = {};
            if (this.tryExtractContactFromInput(value, contact)) {
                this.onSuggestionSelect(contact);
            } else {
                if (this.callback) {
                    this.callback.onAction(this.onCallbackResponse, undefined);
                }
            }
        }
    }

    public onRemoveContact = (address: string) => {
        let field = this.context.form.read(this.id);
        if (field) {
            let currentValue = JSON.parse(field.value) as Array<any>;
            if (currentValue) {
                let index = currentValue.findIndex(v => StringUtils.normalize(v.Address) === StringUtils.normalize(address));
                if (index >= 0) {
                    currentValue.splice(index, 1);
                    this.context.form.write({
                        id: this.id,
                        value: JSON.stringify(currentValue),
                        isValid: true,
                    });
                }
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
                        let index = currentValue.findIndex(v => StringUtils.normalize(v.Address) === StringUtils.normalize(data.Address));
                        if (index < 0) {
                            currentValue.push(data);
                        } else {
                            currentValue[index] = data;
                        }
                        this.context.form.write({
                            id: this.id,
                            value: JSON.stringify(currentValue),
                            isValid: true,
                        });
                        if (this.onSelect) {
                            this.onSelect();
                        }
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

    private tryExtractContactFromInput = (input: string, contact: { Name: string, Address: string }) => {
        if (input) {
            let length = input.length;

            if (length > 0) {
                if (input[length - 1] === ' ' || input[length - 1] === ';') {
                    let subString = input.substr(0, length - 1).trim();
                    if (EmailUtils.isEmail(subString)) {
                        contact.Name = subString;
                        contact.Address = subString;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public get children() {
        if (this.callback) {
            return [this.callback];
        }
        return [];
    }
}
