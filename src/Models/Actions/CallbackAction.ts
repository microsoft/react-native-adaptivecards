import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ActionModel } from '../Abstract/ActionModel';
import { InputModel } from '../Abstract/InputModel';

export class CallbackActionModel extends ActionModel {
    public url: string;
    public parameters: { [key: string]: string; };

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.url = json.url;
        this.parameters = json.parameters;
    }

    public onAction = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
        if (this.context) {
            let handler =  this.context.callbackActionHandler;
            if (handler) {
                handler(this.url, this.params).then(onSuccess).catch(onError);
            }
        }
    }

    private get params() {
        if (this.parameters) {
            if (this.context && this.context.form) {
                let parent = this.parent as InputModel;
                return Object.keys(this.parameters).reduce((prev, current) => {
                    let formIndex = this.parameters[current];
                    if (formIndex === parent.id) {
                        prev[current] = parent.input;
                    } else {
                        let field = this.context.form.read(formIndex);
                        if (field) {
                            prev[current] = field.value;
                        }
                    }
                    return prev;
                }, {} as { [key: string]: string });
            }
        }
        return {};
    }
}
