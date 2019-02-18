import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ScopeModel } from '../Abstract/ScopeModel';
import { ColumnModel } from './Column';
export declare class ColumnSetModel extends ScopeModel {
    columns: ColumnModel[];
    height: 'auto' | 'stretch';
    constructor(json: any, parent: AbstractModel, context: CardContext);
    readonly children: (import("../Actions/OpenUrlAction").OpenUrlActionModel | import("../Actions/SubmitAction").SubmitActionModel | ColumnModel)[];
}
