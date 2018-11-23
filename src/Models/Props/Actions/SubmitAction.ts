import { CardContext } from '../../../Contexts/CardContext';
import { ViewActionType } from '../../../Shared/Types';
import { ViewNode } from '../../Nodes/Abstract/ViewNode';
import { SubmitParam } from '../../Params/Actions/SubmitParam';
import { ViewAction } from '../Abstract/ViewAction';

export class SubmitAction extends ViewAction {
    public readonly type = ViewActionType.Submit;
    public param: SubmitParam;

    constructor(node: ViewNode, payload: any) {
        super(node, payload);

        this.param = new SubmitParam(payload);
    }

    public onAction(context: CardContext): void {
        if (this.enabled && this.param && context) {
            if (context.document.form && context.document.form.isValid()) {
                context.host.onSubmitAction(
                    this.populateFormData(context)
                ).then(
                    info => {
                        if (context.config.mode === 'release') {
                            this.enabled = false;
                        }
                        context.host.onInfo(info);
                    }
                ).catch(
                    error => context.host.onError(error)
                );
            } else {
                context.host.onError('AdaptiveCard >> Form Invalid');
            }
        }
    }

    private populateFormData(context: CardContext) {
        let data = { ...(this.param && this.param.data ? this.param.data : {}) };
        if (context && context.document && context.document.form) {
            return { ...data, ...context.document.form.data };
        }
        return data;
    }
}
