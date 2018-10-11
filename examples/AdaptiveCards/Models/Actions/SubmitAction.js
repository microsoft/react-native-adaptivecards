import { ActionModel } from '../Abstract/ActionModel';
export class SubmitActionModel extends ActionModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.onAction = (onSuccess, onError) => {
            if (this.context && this.context.form) {
                if (this.context.form.isValid()) {
                    console.log('Form valid');
                    let handler = this.context.submitActionHandler;
                    if (handler) {
                        handler(this.populateFormData(this.context)).then(onSuccess).catch(onError);
                    }
                }
                else {
                    console.log('Form invalid');
                    onError('Form invalid');
                }
            }
        };
        this.populateFormData = (context) => {
            let data = Object.assign({}, (this.data || {}));
            if (context && context.form) {
                data = context.form.read().reduce((prev, current) => {
                    if (current.id) {
                        if (current.value) {
                            prev[current.id] = current.value;
                        }
                        else {
                            prev[current.id] = '';
                        }
                    }
                    return prev;
                }, data);
            }
            return data;
        };
        this.data = json.data;
        this.title = json.title;
    }
}
