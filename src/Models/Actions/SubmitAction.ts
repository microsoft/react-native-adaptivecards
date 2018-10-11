import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ActionModel } from '../Abstract/ActionModel';

export class SubmitActionModel extends ActionModel {
    public title: string;
    public data: any;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.data = json.data;
        this.title = json.title;
    }

    public onAction = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
        if (this.context && this.context.form) {
            if (this.context.form.isValid()) {
                console.log('Form valid');
                let handler = this.context.submitActionHandler;
                if (handler) {
                    handler(this.populateFormData(this.context)).then(onSuccess).catch(onError);
                }
            } else {
                console.log('Form invalid');
                onError('Form invalid');
            }
        }
    }

    private populateFormData = (context: CardContext) => {
        let data = { ...(this.data || {}) };
        if (context && context.form) {
            data = context.form.read().reduce((prev, current) => {
                if (current.id) {
                    if (current.value) {
                        prev[current.id] = current.value;
                    } else {
                        prev[current.id] = '';
                    }
                }
                return prev;
            }, data);
        }
        return data;
    }
}
