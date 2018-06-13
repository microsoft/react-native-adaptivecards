import { Utils } from '../../Shared/Utils';
export class CardElement {
    constructor(json) {
        this.isValidJSON = true;
        this.type = this.getTypeName();
        if (!this.type) {
            this.noTypeName();
        }
        this.validateJSON(json, this.getRequiredProperties());
    }
    supportAction() {
        return false;
    }
    getAction() {
        return undefined;
    }
    getActions() {
        return [];
    }
    isInput() {
        return false;
    }
    getId() {
        return undefined;
    }
    getAllInputFieldIds() {
        return [];
    }
    noTypeName() {
        this.isValidJSON = false;
        console.error('Please return a valid type name in \'getTypeName()\' method.');
    }
    noDataFound() {
        this.isValidJSON = false;
        console.error(this.getTypeName() + ': data not found');
    }
    invalidRequiredProperty(property) {
        this.isValidJSON = false;
        console.error(this.getTypeName() + ': ' + property + ' is required');
    }
    validateJSON(json, requiredProperties) {
        if (!json) {
            this.noDataFound();
        }
        if (requiredProperties) {
            for (let i = 0; i < requiredProperties.length; i++) {
                let property = requiredProperties[i];
                if (!Utils.isValidValue(json[property])) {
                    this.invalidRequiredProperty(property);
                    return;
                }
            }
        }
    }
    isValid() {
        return this.isValidJSON;
    }
}
