import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ChoiceSetModel } from './ChoiceSet';
export declare class ChoiceInputModel extends AbstractModel {
    title: string;
    value: string;
    parent: ChoiceSetModel;
    constructor(json: any, parent: AbstractModel, context: CardContext);
    onSelect: () => void;
}
