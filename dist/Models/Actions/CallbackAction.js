import { ActionModel } from '../Abstract/ActionModel';
export class CallbackActionModel extends ActionModel {
    constructor(json, parent, context) {
        super(json, parent, context);
        this.onAction = (onSuccess, onError) => {
            if (this.context) {
                let handler = this.context.callbackActionHandler;
                if (handler) {
                    handler(this.url, this.params).then(onSuccess).catch(onError);
                }
            }
        };
        this.url = json.url;
        this.parameters = json.parameters;
    }
    get params() {
        if (this.parameters) {
            if (this.context && this.context.form) {
                let parent = this.parent;
                return Object.keys(this.parameters).reduce((prev, current) => {
                    let formIndex = this.parameters[current];
                    if (formIndex === parent.id) {
                        prev[current] = parent.input;
                    }
                    else {
                        let field = this.context.form.read(formIndex);
                        if (field) {
                            prev[current] = field.value;
                        }
                    }
                    return prev;
                }, {});
            }
        }
        return {};
    }
}
