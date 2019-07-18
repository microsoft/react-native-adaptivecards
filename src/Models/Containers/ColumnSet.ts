import { CardContext } from '../../Contexts/CardContext';
import { StringUtils } from '../../Utils/StringUtils';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ScopeModel } from '../Abstract/ScopeModel';
import { ColumnModel } from './Column';

export class ColumnSetModel extends ScopeModel {
    public columns: ColumnModel[] = [];
    public height: 'auto' | 'stretch';

    constructor(json: any, parent: AbstractModel, context: CardContext) {
        super(json, parent, context);

        this.height = StringUtils.toLowerCase(json.height);

        this.columns = [];
        if (json.columns) {
            json.columns.forEach((item: any) => {
                let column = new ColumnModel(item, this, this.context);
                if (column) {
                    this.columns.push(column);
                }
            });
        }

    }

    public get children() {
        if (this.selectAction) {
            return [...this.columns, this.selectAction];
        }
        return this.columns;
    }
}
