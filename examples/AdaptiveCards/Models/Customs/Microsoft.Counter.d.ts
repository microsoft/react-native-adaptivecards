import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ActionModel } from '../Abstract/ActionModel';
import { ContentModel } from '../Abstract/ContentModel';
export declare class CounterModel extends ContentModel {
    value: number;
    format: 'Timer' | 'CountDown';
    delay: number;
    callback: ActionModel;
    constructor(json: any, parent: AbstractModel, context: CardContext);
    onFinished: () => void;
}
