import { ViewActionType } from '../../../Shared/Types';
import { OpenUrlParam } from '../../Params/Actions/OpenUrlParam';
import { ViewAction } from '../Abstract/ViewAction';
export class OpenUrlAction extends ViewAction {
    constructor(node, payload) {
        super(node, payload);
        this.type = ViewActionType.OpenUrl;
        this.param = new OpenUrlParam(payload);
    }
    onAction(context) {
        if (this.param && context) {
            if (context.document.form && context.document.form.isValid()) {
                context.host.onOpenUrlAction(this.param.url, this.param.method, this.populateFormData(context)).then(info => context.host.onInfo(info)).catch(error => context.host.onError(error));
            }
        }
    }
    populateFormData(context) {
        let data = Object.assign({}, (this.param && this.param.data ? this.param.data : {}));
        if (context && context.document && context.document.form) {
            return Object.assign({}, data, context.document.form.data);
        }
        return data;
    }
}
