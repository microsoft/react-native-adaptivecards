export class FormContext {
    constructor() {
        this.formFields = {};
    }
    static getInstance() {
        if (FormContext.sharedInstance === undefined) {
            FormContext.sharedInstance = new FormContext();
        }
        return FormContext.sharedInstance;
    }
    updateField(id, value) {
        if (id) {
            this.formFields[id] = value;
        }
    }
    getField(id) {
        if (id) {
            return this.formFields[id];
        }
        return undefined;
    }
    getFields(ids) {
        if (ids) {
            return ids.reduce((prev, id) => {
                let value = this.formFields[id];
                let result = {};
                if (value) {
                    result[id] = value;
                }
                else {
                    result[id] = '';
                }
                return Object.assign({}, prev, result);
            }, {});
        }
        return {};
    }
    validateField(element) {
        console.log('Validate Field');
        if (element) {
            console.log('Pass Element check');
            if (element.isForm()) {
                console.log('Check Form');
                return element.validateForm();
            }
            if (element.isInput()) {
                console.log('Check Input Field');
                let id = element.getId();
                if (id) {
                    console.log('Pass id check');
                    return element.validateForm(this.getField(id));
                }
            }
            console.log('No need check');
            return true;
        }
        return false;
    }
    validateFields(elements) {
        if (elements) {
            return elements.reduce((prev, current) => {
                return prev && this.validateField(current);
            }, true);
        }
        return false;
    }
}
