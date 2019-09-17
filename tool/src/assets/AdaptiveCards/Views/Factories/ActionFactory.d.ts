import { OpenUrlActionModel } from '../../Models/Actions/OpenUrlAction';
import { ShowCardActionModel } from '../../Models/Actions/ShowCardAction';
import { SubmitActionModel } from '../../Models/Actions/SubmitAction';
export declare class ActionFactory {
    static createAction(model: OpenUrlActionModel | ShowCardActionModel | SubmitActionModel, index: number, direction: 'row' | 'column', theme: 'default' | 'emphasis'): JSX.Element;
}
