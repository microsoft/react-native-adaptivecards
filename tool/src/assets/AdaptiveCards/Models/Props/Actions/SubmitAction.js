import { ViewActionType } from '../../../Shared/Types';
import { SubmitParam } from '../../Params/Actions/SubmitParam';
import { ViewAction } from '../Abstract/ViewAction';
export class SubmitAction extends ViewAction {
    constructor(node, json) {
        super(node, json);
        this.type = ViewActionType.Submit;
        this.param = new SubmitParam(json);
    }
    onAction(context) {
        if (this.param && context) {
            if (context.document.form && context.document.form.isValid()) {
                context.host.onSubmitAction(this.populateFormData(context)).then(info => context.host.onInfo(info)).catch(error => context.host.onError(error));
            }
        }
    }
    populateFormData(context) {
        let data = Object.assign({}, (this.param && this.param.data ? this.param.data : {}));
        if (context && context.document && context.document.form) {
            data = context.document.form.read().reduce((prev, current) => {
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
    }
}
