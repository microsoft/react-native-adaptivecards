import { CardContext } from '../../Contexts/CardContext';
import { InputModel } from '../Abstract/InputModel';
import { CallbackActionModel } from '../Actions/CallbackAction';
import { CardModel } from '../Cards/Card';
export class PeoplePickerModel extends InputModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.isValueValid = (value) => true;
        this.onInput = (value) => {
            if (value !== undefined) {
                this.input = value;
                if (this.callback) {
                    this.callback.onAction(this.onCallbackResponse, undefined);
                }
            }
        };
        this.onRemoveContact = (address) => {
            let field = this.context.form.read(this.id);
            if (field) {
                let currentValue = JSON.parse(field.value);
                if (currentValue) {
                    let index = currentValue.findIndex(v => v.Address === address);
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
        };
        this.onSuggestionSelect = (data) => {
            console.log('Select Action >>', data, '>>', this.context.form);
            if (this.context && this.context.form) {
                let field = this.context.form.read(this.id);
                if (field) {
                    let currentValue = JSON.parse(field.value);
                    if (currentValue) {
                        if (data && currentValue.findIndex(v => v.Address === data.Address) < 0) {
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
        };
        this.storeListener = (field) => {
            this.selected = field.value;
            if (field) {
                if (this.onStoreUpdate) {
                    this.onStoreUpdate(this.selected);
                }
            }
        };
        this.onCallbackResponse = (data) => {
            this.suggestionCard = new CardModel(data, this, this.suggestionContext);
            if (this.onSuggestionReady) {
                this.onSuggestionReady(this.suggestionCard);
            }
        };
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
    get children() {
        if (this.callback) {
            return [this.callback];
        }
        return [];
    }
}
