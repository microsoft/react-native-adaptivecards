import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ContentModel } from '../Abstract/ContentModel';
import { OpenUrlActionModel } from '../Actions/OpenUrlAction';
import { ShowCardActionModel } from '../Actions/ShowCardAction';
import { SubmitActionModel } from '../Actions/SubmitAction';
export declare class CardModel extends ContentModel {
    body: ContentModel[];
    actions: Array<OpenUrlActionModel | SubmitActionModel | ShowCardActionModel>;
    backgroundImage: string;
    constructor(json: any, parent: AbstractModel, context: CardContext);
    readonly children: (ContentModel | OpenUrlActionModel | ShowCardActionModel | SubmitActionModel)[];
}
