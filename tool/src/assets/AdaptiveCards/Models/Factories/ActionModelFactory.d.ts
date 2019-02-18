import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ActionModel } from '../Abstract/ActionModel';
export declare class ActionModelFactory {
    static create(json: any, parent: AbstractModel, context: CardContext): ActionModel;
    static createSet(json: any, parent: AbstractModel, context: CardContext): ActionModel[];
}
