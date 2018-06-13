export class InputContext {
    constructor() {
        this.formFields = {};
    }
    static getInstance() {
        if (InputContext.sharedInstance === undefined) {
            InputContext.sharedInstance = new InputContext();
        }
        return InputContext.sharedInstance;
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
}
