import { ViewActionType } from '../../../Shared/Types';
import { SubmitParam } from '../../Params/Actions/SubmitParam';
import { ViewAction } from '../Abstract/ViewAction';
export class SubmitAction extends ViewAction {
    constructor(node, payload) {
        super(node, payload);
        this.type = ViewActionType.Submit;
        this.param = new SubmitParam(payload);
    }
    onAction(context) {
        if (this.enabled && this.param && context) {
            if (context.document.form && context.document.form.isValid()) {
                context.host.onSubmitAction(this.populateFormData(context)).then(info => {
                    if (context.config.mode === 'release') {
                        this.enabled = false;
                    }
                    context.host.onInfo(info);
                }).catch(error => context.host.onError(error));
            }
            else {
                context.host.onError('AdaptiveCard >> Form Invalid');
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
