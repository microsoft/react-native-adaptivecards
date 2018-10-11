import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ActionModel } from '../Abstract/ActionModel';

export class OpenUrlActionModel extends ActionModel {
    public title: string;
    public method: 'GET' | 'POST';
    public data: any;
    public url: string;

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.url = json.url;
        this.title = json.title;
        // Customize for STCI
        this.method = json['-ms-method'];
        this.data = json['-ms-data'];
    }

    public onAction = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
        if (this.context && this.context.form) {
            if (this.context.form.isValid()) {
                console.log('Form valid');
                let handler = this.context.openUrlActionHandler;
                if (handler) {
                    handler(this.url, this.method, this.populateFormData(this.context)).then(onSuccess).catch(onError);
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
