import { CardContext } from '../../../Contexts/CardContext';
import { ViewActionType } from '../../../Shared/Types';
import { ViewNode } from '../../Nodes/Abstract/ViewNode';
import { SubmitParam } from '../../Params/Actions/SubmitParam';
import { ViewAction } from '../Abstract/ViewAction';

export class SubmitAction extends ViewAction {
    public readonly type = ViewActionType.Submit;    
    public param: SubmitParam;

    constructor(node: ViewNode, json: any) {
        super(node, json);

        this.param = new SubmitParam(json);
    }
    
    public onAction(context: CardContext): void {
        if (this.param && context) {
            if (context.document.form && context.document.form.isValid()) {
                context.host.onSubmitAction(
                    this.populateFormData(context)
                ).then(
                    info => context.host.onInfo(info)
                ).catch(
                    error => context.host.onError(error)
                );
            }
        }
    }

    private populateFormData(context: CardContext) {
        let data = { ...(this.param && this.param.data ? this.param.data : {}) };
        if (context && context.document && context.document.form) {
            data = context.document.form.read().reduce((prev, current) => {
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
