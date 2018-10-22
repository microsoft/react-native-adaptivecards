import { CardContext } from '../../Contexts/CardContext';
import { EmailUtils } from '../../Utils/EmailUtils';
import { StringUtils } from '../../Utils/StringUtils';
import { InputModel } from '../Abstract/InputModel';
import { CallbackActionModel } from '../Actions/CallbackAction';
import { CardModel } from '../Cards/Card';
export class PeoplePickerModel extends InputModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.isValueValid = (value) => {
            let field = this.context.form.read(this.id);
            if (field) {
                let currentValue = JSON.parse(field.value);
                if (currentValue) {
                    return currentValue.length !== 0;
                }
            }
            return false;
        };
        this.onInput = (value) => {
            if (value !== undefined) {
                this.input = value;
                let contact = {};
                if (this.tryExtractContactFromInput(value, contact)) {
                    this.onSuggestionSelect(contact);
                }
                else {
                    if (this.callback) {
                        this.callback.onAction(this.onCallbackResponse, undefined);
                    }
                }
            }
        };
        this.onRemoveContact = (address) => {
            let field = this.context.form.read(this.id);
            if (field) {
                let currentValue = JSON.parse(field.value);
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
        };
        this.onSuggestionSelect = (data) => {
            console.log('Select Action >>', data, '>>', this.context.form);
            if (this.context && this.context.form) {
                let field = this.context.form.read(this.id);
                if (field) {
                    let currentValue = JSON.parse(field.value);
                    if (currentValue) {
                        if (data) {
                            let index = currentValue.findIndex(v => StringUtils.normalize(v.Address) === StringUtils.normalize(data.Address));
                            if (index < 0) {
                                currentValue.push(data);
                            }
                            else {
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
        this.tryExtractContactFromInput = (input, contact) => {
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
